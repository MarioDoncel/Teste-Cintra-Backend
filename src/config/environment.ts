require('dotenv/config');
interface IEnvironmentVariables{
    MONGO_CONNECTION:any
}

const environmentVariables:IEnvironmentVariables = {
    MONGO_CONNECTION:process.env.MONGO_CONNECTION
}

export default environmentVariables