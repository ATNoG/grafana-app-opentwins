import React, { useEffect, useState } from 'react';
import { InlineField, Select } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { MyDataSourceOptions, MyQuery } from './types';
import { emptyContext } from 'utils/context/staticContext';
import { FetchResponse, getBackendSrv } from '@grafana/runtime';
import { firstValueFrom } from 'rxjs';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function VariableQueryEditor({ query, onChange, onRunQuery, datasource }: Props) {
  const onThingIDChange = (value: string | undefined) => {
    onChange({ ...query, thingID: value });
  };

  const { thingID } = query;
  const [ids, setIds] = useState<Array<{ label: string; value: string }>>([]);
  
  useEffect(() => {
    const fetchThingIds = async () => {
      let context = { ...emptyContext };
      context.ditto_extended_endpoint = datasource.getBaseUrl();

      try {
        const twinsResponse: FetchResponse<any[]> = await firstValueFrom(
          getBackendSrv().fetch<any[]>({
            url: datasource.getUrl() + datasource.getRoutePath() + `/${datasource.getPath()}/things?option=size(200)`,
            method: 'GET',
          })
        );

        const twins = twinsResponse.data;

        let res = twins.map((item: any) => ({
          label: item.thingId, // Displayed text
          value: item.thingId, // Actual value
        }));
        setIds(res);

      } catch (error) {
        console.error("Error fetching thing IDs:", error);
      }
    };

    fetchThingIds();
  }, []);

  return (
    <>
      <InlineField label="Thing ID" labelWidth={20} tooltip="Not used yet">
        <Select
          id="query-editor-thing-id"
          options={ids}
          onChange={(option) => onThingIDChange(option.value)}
          value={thingID || ''}
          placeholder="Enter a query"
        />
      </InlineField>
    </>
  );
}
