import kyDefault from "ky";
import config from "./config";

const ky = kyDefault.extend(config);

export default ky;
