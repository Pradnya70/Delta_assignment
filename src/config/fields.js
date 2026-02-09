export const USER_FIELDS = [
  {
    key: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name',
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    }
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name',
    validation: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/
    }
  },
  {
    key: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: '+91 98765 43210',
    validation: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/
    }
  },
  {
    key: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'user@example.com',
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  }
  // Add new fields here easily!
  // {
  //   key: 'dateOfBirth',
  //   label: 'Date of Birth',
  //   type: 'date',
  //   required: false
  // }
];
