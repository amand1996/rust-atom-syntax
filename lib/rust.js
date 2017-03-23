'use babel';

import RustView from './rust-view';
import { CompositeDisposable } from 'atom';

export default {

  rustView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rustView = new RustView(state.rustViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rustView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rust:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rustView.destroy();
  },

  serialize() {
    return {
      rustViewState: this.rustView.serialize()
    };
  },

  toggle() {
    console.log('Rust was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
