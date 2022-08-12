import { getDomain, hasValidUrlProtocol, isEmail } from 'js-string-helper'
const domainFromUrl = getDomain
const isValidHttpUrl = hasValidUrlProtocol

const validateEmail = isEmail

export { domainFromUrl, isValidHttpUrl, validateEmail };
