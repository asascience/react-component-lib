import { configure } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);

configureActions({
	depth: 100,
	//  limit the number of logged actions
	limit: 20,
});