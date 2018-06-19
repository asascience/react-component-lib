import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';



/* TODO: Fix Dependencies in  existing components */
// import DataTableFieldInput from '../src/components/DataTable/DataTableFieldInput';
// import DataTable from '../src/components/DataTable/DataTable';
// import TabbedView from '../src/components/TabbedView/TabbedView';
// import FlowFooter from '../src/components/FlowFooter/FlowFooter';

// addDecorator((story) => (
//   <MuiThemeProvider>
//     {story()}
//   </MuiThemeProvider>
// ));

// storiesOf('Data Table Field Input', module)
//   .add('staticText', ()=>(
//     <DataTableFieldInput
//       objectData={{
//         fieldType: 'text',
//         severity: 'suggested',
//         text: 'sampleText',
//       }}
//     />
//   ))
//   .add('autocomplete', ()=>(
//     <DataTableFieldInput
//       objectData={{
//         fieldType: 'text',
//         severity: 'suggested',
//         text: 'sampleText',
//         options: ['sample a', 'sample b', 'a', 'b'],
//       }}
//     />
//   ))
//   .add('dropdown', ()=>(
//     <DataTableFieldInput
//       objectData={{
//         fieldType: 'dropdown',
//         severity: 'suggested',
//         text: 'sampleText',
//         options: ['sample a', 'sample b', 'a', 'b'],
//       }}
//     />
//   ))
//   .add('tag input', ()=>(
//     <DataTableFieldInput
//       objectData={{
//         fieldType: 'tagInput',
//         severity: 'suggested',
//         text: 'sampleText',
//         options: ['sample a', 'sample b', 'a', 'b'],
//         onUpdate: ()=>{},
//       }}
//     />
//   ))
//   .add('date picker', ()=>(
//     <DataTableFieldInput
//       objectData={{
//         fieldType: 'datePicker',
//         severity: 'suggested',
//       }}
//     />
//   ));

// storiesOf('Data Table', module)
//   .add('Key Value', ()=>(
//     <DataTable
//       jsonData={{
//         header: [
//           {text: 'Field Name'},
//           {text: 'Value'}
//         ],
//         content: [
//           [
//             {
//               fieldType: 'textBox',
//               description: 'This is a key',
//               disabled: true,
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               severity: 'required',
//               text: '',
//             }
//           ],
//           [
//             {
//               fieldType: 'textBox',
//               description: 'This is a key too!',
//               disabled: true,
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               severity: 'suggested',
//               text: '',
//             }
//           ]
//         ],
//       }}
//       headerEnabled={true}
//       verbose={true}
//     />
//   ))
//   .add('Variables', ()=>(
//     <DataTable
//       jsonData={{
//         header: [
//           {
//             colIndex: 0,
//             sortType: 'alphabetical',
//             text: 'Variable Name',
//           },
//           {
//             colIndex: 1,
//             sortType: 'numeric',
//             text: 'Dimensions',
//           },
//           {
//             colIndex: 2,
//             link: 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#units',
//             sortType: 'alphabetical',
//             text: 'Units',
//           },
//           {
//             colIndex: 3,
//             link: 'http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html',
//             sortType: 'alphabetical',
//             text: 'Standard Name',
//           },
//           {
//             colIndex: 4,
//             link: 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#long-name',
//             sortType: 'alphabetical',
//             text: 'Long Name',
//           }
//         ],
//         content: [
//           [
//             {
//               fieldType: 'textBox',
//               text: 'u',
//             },
//             {
//               fieldType: 'numericBadge',
//               data: ['ocean_time', 'eta_rho', 'xi_rho'],
//               disabled: true,
//               text: '3D',
//             },
//             {
//               fieldType: 'textBox',
//               text: 'meter second-1',
//               validated: true,
//               validationTooltip: 'Invalid units. Units string must be recognized by UNIDATA\'s Udunits package',
//               text: 'key',
//             },
//             {
//               fieldType: 'textBox',
//               options: ['a', 'b', 'c'],
//               text: '',
//               validated: true,
//               validationTooltip: 'Invalid standard_name. The set of permissible standard names is contained in the CF standard name table.'
//             },
//             {
//               fieldType: 'textBox',
//               text: 'u-momentum component',
//             }
//           ]
//         ],
//       }}
//       headerEnabled={true}
//       verbose={true}
//     />
//   ));

// storiesOf('TabbedView', module)
//   .add('Single Tab With Header', ()=>(
//     <TabbedView
//       headerEnabled={true}
//       jsonData={{
//         'Only One Tab': {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key too!',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'suggested',
//                 text: '',
//               }
//             ]
//           ],
//         }
//       }}
//     />
//   ))
//   .add('Single Tab Without Header', ()=>(
//     <TabbedView
//       headerEnabled={false}
//       jsonData={{
//         'Only One Tab': {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key too!',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'suggested',
//                 text: '',
//               }
//             ]
//           ],
//         }
//       }}
//     />
//   ))
//   .add('Multiple Tabs', ()=>(
//     <TabbedView
//       jsonData={{
//         First: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         },
//         Second: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         },
//         Third: {
//           header: [
//             {text: 'Field Name'},
//             {text: 'Value'}
//           ],
//           content: [
//             [
//               {
//                 fieldType: 'textBox',
//                 description: 'This is a key',
//                 disabled: true,
//                 text: 'key',
//               },
//               {
//                 fieldType: 'textBox',
//                 severity: 'required',
//                 text: '',
//               }
//             ],
//           ]
//         }
//       }}
//     />
//   ));

// storiesOf('FlowFooter', module)
//   .add('All Buttons', ()=>(
//     <FlowFooter footerStyle={'allButtons'}/>
//   ))
//   .add('Admin', ()=>(
//     <FlowFooter footerStyle={'admin'}/>
//   ))
//   .add('Survey', ()=>(
//     <FlowFooter footerStyle={'survey'}/>
//   ))
//   .add('Paging Only', ()=>(
//     <FlowFooter footerStyle={'pagingOnly'}/>
//   ))
//   .add('Submit', ()=>(
//     <FlowFooter footerStyle={'submit'}/>
//   ))
//   .add('Survey Submit', ()=>(
//     <FlowFooter footerStyle={'surveySubmit'}/>
//   ));
