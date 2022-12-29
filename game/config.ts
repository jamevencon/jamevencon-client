// export const server = "http://damascus.kro.kr:5656";

export const getServer = () =>
  "http://" + location.host.split(":")[0] + ":5656";
