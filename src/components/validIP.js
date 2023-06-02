
function ValidIP(ipAddress) {
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipPattern.test(ipAddress);
}
export default ValidIP
