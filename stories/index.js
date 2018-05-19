import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataTableFieldInput from '../src/components/DataTable/DataTableFieldInput';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

addDecorator((story) => (
  <MuiThemeProvider>
    {story()}
  </MuiThemeProvider>
));

storiesOf('Data Table Field Input', module)
  .add('staticText', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'text',
        severity: 'suggested',
        text: 'sampleText',
      }}
    />
  ))
  .add('autocomplete', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'text',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
      }}
    />
  ))
  .add('dropdown', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'dropdown',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
      }}
    />
  ))
  .add('tag input', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'tagInput',
        severity: 'suggested',
        text: 'sampleText',
        options: ['sample a', 'sample b', 'a', 'b'],
        onUpdate: ()=>{},
      }}
    />
  ))
  .add('date picker', ()=>(
    <DataTableFieldInput
      objectData={{
        fieldType: 'datePicker',
        severity: 'suggested',
      }}
    />
  ));