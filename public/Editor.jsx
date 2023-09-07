import remirrorEditorStyles from 'remirror/styles/all.css';
// import 'remirror/styles/all.css'; //this is from remirror docs. But it won't work. The above is a part of a (temporary) hack.

import { BoldExtension } from 'remirror/extensions';
import { EditorComponent, Remirror, useRemirror, useActive, useChainedCommands } from '@remirror/react';

const Menu = () => {
  console.log('this is a hack in order to get the styles injected: ', remirrorEditorStyles);
    // Using command chaining
    const chain = useChainedCommands();
    const active = useActive();
  
    return (
      <button
        onClick={() => {
          chain // Begin a chain
            .toggleBold()
            .focus()
            .run(); // A chain must always be terminated with `.run()`
        }}
        style={{ fontWeight: active.bold() ? 'bold' : undefined }}
      >
        B
      </button>
    );
  };

export default function MyApp() {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
    content: '<p>I love <b>Remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  });

  return (
    <div className='remirror-theme'>
      <Remirror manager={manager} initialContent={state}>
        {/* The text editor is placed above the menu to make the zIndex easier to manage for popups */}
        <EditorComponent />
        <Menu />
      </Remirror>
    </div>
  );
};