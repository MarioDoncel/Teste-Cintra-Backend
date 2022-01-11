const fifteenDays = 15*24*60*60*1000
const now = new Date().getTime()

const refreshTokenExp = now + fifteenDays


export default {
  jwt: {
      secret: process.env.JWT_SECRET || 'default',
      expiresIn: '1s',
  },
  refreshToken: {
    expiresIn: refreshTokenExp
  }
};