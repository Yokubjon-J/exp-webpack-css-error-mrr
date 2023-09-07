import remirrorEditorStyles from 'remirror/styles/all.css';
// import 'remirror/styles/all.css'; //this is from remirror docs. But it won't work. The above is a part of a (temporary) hack.
import { useCommands } from '@remirror/react';
import { htmlToProsemirrorNode } from 'remirror';
import { BoldExtension, ItalicExtension } from 'remirror/extensions';
import { EditorComponent,
    Remirror, 
    ThemeProvider, 
    ToggleItalicButton, 
    ToggleBoldButton,
    Toolbar,
    useRemirror 
  } from '@remirror/react';

const Menu = () => {
    console.log('this is a hack in order to get the styles injected: ', remirrorEditorStyles);
        const { toggleBold, focus } = useCommands();
        
        return (
            <button
                onClick={() => {
                    toggleBold();
                    focus();
                }}
                style={{ fontWeight: active.bold() ? 'bold' : undefined }}
                onClick={() => toggleBold()} disabled={toggleBold.enabled() === false}
            >
                B
            </button>
        );
    };

export default function MyApp() {
    const { manager, state, onChange } = useRemirror({
        extensions: () => [new BoldExtension(), new ItalicExtension()],
        content: '<p>I love <b>Remirror</b></p>',
        selection: 'start',
        stringHandler: htmlToProsemirrorNode,
    });
  
    return (
        <ThemeProvider>
            <Remirror
                manager={manager}
                autoFocus
                onChange={onChange}
                initialContent={state}
                autoRender='end'
            >
                <Toolbar>
                    <ToggleItalicButton />
                    <ToggleBoldButton />
                </Toolbar>
            </Remirror>
        </ThemeProvider>
    );
};