export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateTransactionHash = (): string => {
  return '0x' + Math.random().toString(16).substr(2, 20);
};

export const calculateProgress = (raised: number, target: number): number => {
  return Math.min((raised / target) * 100, 100);
};