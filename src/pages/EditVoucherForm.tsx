import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import AnimatedLayout from '../components/animated-layout';
import MemoVoucherForm from '../components/voucher-form/MemoVoucherForm';
import SkeletonForm from '../components/voucher-form/SkeletonForm';
import { getVoucher } from '../utils/api';
import { convertToDayjs } from '../utils/date';
import { voucherFormValues } from '../constants/globalTypes';

const EditVoucherForm = () => {
  const { action, id } = useLoaderData() as {
    action: voucherFormValues['action'];
    id: string;
  };

  const { data: voucher, isLoading } = useQuery({
    queryKey: ['voucher', id],
    queryFn: ({ signal }) => getVoucher({ id, signal }),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 15000,
    cacheTime: 15 * (60 * 1000),
  });

  return (
    <AnimatedLayout className='form-container'>
      {isLoading ? (
        <SkeletonForm />
      ) : (
        <MemoVoucherForm
          defaultValues={
            {
              ...voucher,
              action: action,
              startDate: convertToDayjs(voucher?.startDate ?? ''),
              expiryDate: convertToDayjs(voucher?.expiryDate ?? ''),
            } as voucherFormValues
          }
        />
      )}
    </AnimatedLayout>
  );
};

export default EditVoucherForm;
