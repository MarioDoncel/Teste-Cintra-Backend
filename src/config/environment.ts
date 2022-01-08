require('dotenv/config');
interface IEnvironmentVariables{
    MONGO_CONNECTION:string
}

const environmentVariables:IEnvironmentVariables = {
    MONGO_CONNECTION:process.env.MONGO_CONNECTION || 'Please, set your environment variables'
}

export default environmentVariables