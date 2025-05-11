const isDevelopment = true;

const accounts = {
  github: "https://github.com/mahros-alqabasy/cura-agent",
  linkedin: "https://linkedin.com/ma7ros"
};

const BASENAME = () => {
  const host = window.location.host;
  const hosts = [
    "mahros-alqabasy.github.io",
  ];


  if (host in hosts) {

    return '/cura-agent/'
  }

  return '/'
};

export { isDevelopment, accounts, BASENAME };
