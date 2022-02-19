import * as Yup from 'yup';

export const transactionSchema = Yup.object().shape({
  title: Yup.string().trim().required('O titulo é obrigatório'),
  amount: Yup.number().positive('Insira um valor valido'),
  category: Yup.string().trim().required('A categoria é obrigatória'),
});
