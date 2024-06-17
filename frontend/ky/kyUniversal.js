import kyDefault from "ky-universal";
import config from "./config";

const ky = kyDefault.extend(config);

export default ky;
