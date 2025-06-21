
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface CreditCardFormProps {
  form: UseFormReturn<CreditCardFormData>;
}

const CreditCardForm = ({ form }: CreditCardFormProps) => {
  const { t } = useTranslation();

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substr(0, 5);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">{t('tixcraft.payment.creditCard')}</h3>
      </div>
      
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('tixcraft.payment.creditCardForm.cardNumber')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('tixcraft.payment.creditCardForm.cardNumberPlaceholder')}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    maxLength={19}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('tixcraft.payment.creditCardForm.cardholderName')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('tixcraft.payment.creditCardForm.cardholderPlaceholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tixcraft.payment.creditCardForm.expiryDate')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('tixcraft.payment.creditCardForm.expiryPlaceholder')}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tixcraft.payment.creditCardForm.cvv')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('tixcraft.payment.creditCardForm.cvvPlaceholder')}
                      maxLength={4}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreditCardForm;
