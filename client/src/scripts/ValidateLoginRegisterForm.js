export function validateName(userName) {
  if (userName.length < 3) {
    return false
  }

  const regex = /^[a-zA-Z\s]+$/
  return regex.test(userName)
}

export function validateEmail(userEmail) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return regex.test(userEmail)
}

export function validatePassword(userPassword) {
  // Minimum length of 6 characters
  if (userPassword.length < 6) {
    return false
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(userPassword)) {
    return false
  }

  // At least one special character (you can customize this character set)
  if (!/[-!@#$%^&*()_+|~=`{}[\]:";'<>?,.\\]/.test(userPassword)) {
    return false
  }

  // If all conditions pass, the password is valid
  return true
}

export function validateDate(userDate) {
  const date = new Date(userDate)
  return !isNaN(date.getTime())
}
