import * as yup from 'yup';

const voucherFormSchema = yup.object().shape({
  action: yup
    .string()
    .required()
    .matches(/(Create|Update|Delete)/, { excludeEmptyString: false }),
  category: yup
    .string()
    .required()
    .matches(/(Delivery|Dine-in|Pandago|Pandamart|Pick-up)/, {
      excludeEmptyString: false,
    }),
  description: yup
    .string()
    .min(4, 'Description must contain at least 4 letters')
    .required('Please provide a description'),
  minSpending: yup
    .number()
    .min(0, 'Minimum spending must be positive')
    .required()
    .typeError('Please type in a number'),
  startDate: yup.date().required(),
  expiryDate: yup
    .date()
    .min(yup.ref('startDate'), "Expiry Date can't be before the starting date")
    .required(),
});

export default voucherFormSchema;