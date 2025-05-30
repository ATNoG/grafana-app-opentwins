import { useCallback } from 'react';
import type { EditorProps, BasicSecureJsonData } from './types';

type OnChangeType = () => void;

export function useResetSecureOptions(props: EditorProps, propertyName: keyof BasicSecureJsonData): OnChangeType {
  const { onOptionsChange, options } = props;

  return useCallback(() => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        [propertyName]: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        [propertyName]: '',
      },
    });
  }, [onOptionsChange, options, propertyName]);
}
