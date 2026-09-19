param(
  [Parameter(Mandatory=$true)][string]$OutputDirectory,
  [Parameter(Mandatory=$true)][string[]]$Addresses
)
$ErrorActionPreference='Stop'
$target=[IO.Path]::GetFullPath($OutputDirectory)
if(Test-Path -LiteralPath $target){throw 'Certificate directory already exists; preserve the existing trust identity.'}
New-Item -ItemType Directory -Path $target | Out-Null
# Keep signing and server keys local to this user and SYSTEM.
$acl=[Security.AccessControl.DirectorySecurity]::new()
$acl.SetAccessRuleProtection($true,$false)
foreach($sid in @([Security.Principal.WindowsIdentity]::GetCurrent().User,[Security.Principal.SecurityIdentifier]::new('S-1-5-18'))){
  $rule=[Security.AccessControl.FileSystemAccessRule]::new($sid,'FullControl','ContainerInherit,ObjectInherit','None','Allow')
  $acl.AddAccessRule($rule)
}
Set-Acl -LiteralPath $target -AclObject $acl
$caKey=[Security.Cryptography.RSA]::Create(3072)
$leafKey=[Security.Cryptography.RSA]::Create(2048)
$hash=[Security.Cryptography.HashAlgorithmName]::SHA256
$padding=[Security.Cryptography.RSASignaturePadding]::Pkcs1
$rootRequest=[Security.Cryptography.X509Certificates.CertificateRequest]::new("CN=DSH LAN CA $env:COMPUTERNAME",$caKey,$hash,$padding)
$rootRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($true,$false,0,$true))
$rootRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new([Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyCertSign -bor [Security.Cryptography.X509Certificates.X509KeyUsageFlags]::CrlSign,$true))
$rootRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509SubjectKeyIdentifierExtension]::new($rootRequest.PublicKey,$false))
$start=[DateTimeOffset]::UtcNow.AddMinutes(-5)
$root=$rootRequest.CreateSelfSigned($start,$start.AddYears(3))
$leafRequest=[Security.Cryptography.X509Certificates.CertificateRequest]::new("CN=DSH LAN $env:COMPUTERNAME",$leafKey,$hash,$padding)
$leafRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($false,$false,0,$true))
$leafRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new([Security.Cryptography.X509Certificates.X509KeyUsageFlags]::DigitalSignature -bor [Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyEncipherment,$true))
$eku=[Security.Cryptography.OidCollection]::new();$null=$eku.Add([Security.Cryptography.Oid]::new('1.3.6.1.5.5.7.3.1'))
$leafRequest.CertificateExtensions.Add([Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension]::new($eku,$false))
$san=[Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder]::new()
$san.AddDnsName('localhost')
foreach($address in ($Addresses+@('127.0.0.1') | Select-Object -Unique)){$san.AddIpAddress([Net.IPAddress]::Parse($address))}
$leafRequest.CertificateExtensions.Add($san.Build())
$serial=[byte[]]::new(16);[Security.Cryptography.RandomNumberGenerator]::Fill($serial)
$leaf=$leafRequest.Create($root,$start,$start.AddDays(365),$serial)
[IO.File]::WriteAllText((Join-Path $target 'ca.pem'),$root.ExportCertificatePem())
[IO.File]::WriteAllBytes((Join-Path $target 'DSH-LAN-CA.crt'),$root.Export([Security.Cryptography.X509Certificates.X509ContentType]::Cert))
[IO.File]::WriteAllText((Join-Path $target 'ca-key.pem'),$caKey.ExportPkcs8PrivateKeyPem())
[IO.File]::WriteAllText((Join-Path $target 'server.pem'),$leaf.ExportCertificatePem())
[IO.File]::WriteAllText((Join-Path $target 'server-key.pem'),$leafKey.ExportPkcs8PrivateKeyPem())
[pscustomobject]@{Directory=$target;Expires=$leaf.NotAfter;FingerprintSHA256=$root.GetCertHashString($hash);Addresses=$Addresses}
$leaf.Dispose();$root.Dispose();$leafKey.Dispose();$caKey.Dispose()
