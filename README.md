# react-component-lib
A library of reusable React components

### Wiki resources:
[Crafting more reusable react components](https://github.com/asascience/react-component-lib/wiki/Crafting-more-reusable-react-components)

### Component Library Storybook

The component library uses [storybookjs](https://github.com/storybooks/storybook) to display components. To run the storybook clone the project, run `npm install --save` and `npm run storybook`. If successful, the storybook should run in the browser at `localhost:9001`.

### Development
To use test local changes to the react-component-lib `cd react-component-lib/` and `npm run build` or `npm run develop` to run with a watcher. In another terminal navigate to your target front end project and run `npm install --save ../<PathToReactComponentLib>`. Then within your project you can `import {YourComponent} from react-component-lib`. Make sure that you export the component from the component-lib in the [index.js](src/components/index.js) of the component directory.
The development workflow so far has been to develop a component on one of the front-end projects and then move it over to the upload-tool-connector. This is much easier than developing from inside the react-component-lib because the package must be transpiled to be installed in a front-end project. The container components are not exported from the react-component-lib because they are too tightly coupled with their former projects. To change this you must update the [index.js](src/index.js) in `/src/` to `export * from './containers/index.js';`
### Testing
Some testing has been implemented on the lower level components using jest. `npm install --save` should import the testing dependencies. You can then run the tests using either `npm run test` or `npm test-develop` which runs the tests with a watcher.
#### Testing in the Future
The tests implemented so far are not true ui-tests, just testing for example that a stepper component renders the correct number of steps for given props. Snapshot testing (https://jestjs.io/docs/en/snapshot-testing) takes snapshots of each component and tests that the rendered component matches the previous snapshot. If there is not a match, the test will fail and the developer can either update the snapshot to indicate that the changes were intended or examine why the changes were caused unintentionally. This may be overkill for what we are looking to do with the react-component-lib, but most of those components should be pretty stable (especially the low-level ones) so it could be a good idea.


### Example react component libraries
https://github.com/vjwilson/recipe-components
