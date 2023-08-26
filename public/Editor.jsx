// import 'remirror/styles/all.css';
// import { BoldExtension } from 'remirror/extensions';
// import { Remirror, useRemirror } from '@remirror/react';

// export default function MyApp() {
//     const { manager, state, onChange } = useRemirror({
//         extensions: () => [new BoldExtension()],
//         content: '<p>I love <b>Remirror</b></p>',
//         selection: 'start',
//         stringHandler: 'html',
//     });

//     return (
        
//             <div className='remirror-theme'>
//             {/* the className is used to define css variables necessary for the editor */}
//                 <Remirror manager={manager} initialContent={state}/>
//             </div>
//     );
// }

import 'remirror/styles/all.css';

import { BoldExtension } from 'remirror/extensions';
import { EditorComponent, Remirror, useRemirror, useActive, useChainedCommands } from '@remirror/react';

const Menu = () => {
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