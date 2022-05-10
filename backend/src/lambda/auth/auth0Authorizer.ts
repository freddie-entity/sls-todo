import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
// import Axios from 'axios'
// import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
// const jwksUrl = '...'
const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJa14Bc8jsqAdrMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi10cDF1eWZ2YS5hdS5hdXRoMC5jb20wHhcNMjIwNTA1MDYyNDEzWhcN
MzYwMTEyMDYyNDEzWjAkMSIwIAYDVQQDExlkZXYtdHAxdXlmdmEuYXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyxEj3pt9O9k9nVtK
lYbcPDlyzK+sY+uFciQMiHXZvcmTLEGFMxAGqLeSii50HCnObRIUWb9r91UeNrSA
1xnWQAgc1+EH4+nbokf0iDpoGAimKDor1rnWRWEAhfSOUCMU2kfHw+F3W4MDT19x
63tdzhr7pK51QPJbrMmQfMYJb4zpu/S+2rNu7qBHlSYdlirNpbCpsODv9zD6qzud
4jUuc0XYctr18mrz2NoEbLK3ucAt+08bwXXuKrC6fx9jkLl2Y1plAZudBZnKiMoX
t0R9J3KF+S20M+yjxZcmqvG6a1k9P8UCNbjukMCGMECKmsXP3gdoQgTepCfBg7LL
WiRXWQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQe7OjMFGIS
MI1HDd1cqGJG0Hd/bDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AL3B1NU6rTXhTHQKYMTDEagGpiDtZTdv3YrUM2IUzl//yPnB8GJoLV126G5quYpL
vdXt0gjesXH54QmrkZdNPaSyQ71mGVY9atcl96VlyjIsXZyisZo3bE6psuZvOnnY
fiacllloQdcZ0/Akst1WgZxsXmcans96H3foffCGhJYUmSI0DrJcBWMu4O6mB0rA
lt5ErQYnjQ618zaWoqXvmC0ahe6QkMmoOvspFjnDtnjM4lNVEvnFpbQ2xU0Q0q9/
F5MbYPnNOPrJ8ZDkDKW4f7HeJF/OuHWho212pKL8o6ZKIOVeNFiA7sNjQtu/IScY
dYPtVlpmDzoDhPyhB5POcug=
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  // const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
