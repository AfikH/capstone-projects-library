import { 
	MDXEditor,
	headingsPlugin,
	listsPlugin,
	UndoRedo,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	linkDialogPlugin,
	InsertTable,
	tablePlugin,
	ListsToggle,
	Separator,
	toolbarPlugin } from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';
import '../../assets/css/custom-mdx.css';

const Editor = ({ editorRef, ...props }) => (
	<MDXEditor
		markdown={props.defaultValue || ''}
		plugins={[
			headingsPlugin(),
			linkDialogPlugin(),
			tablePlugin(),
			listsPlugin,
			toolbarPlugin({
				toolbarContents: () => (
					<>
						<UndoRedo />
						<Separator />
						<BlockTypeSelect />
						<BoldItalicUnderlineToggles />
						<CreateLink />
						<Separator />
						<ListsToggle />
						<Separator />
						<InsertTable />
					</>
				)
			})	  
		]}
		placeholder="Project Content..."
		ref={editorRef}
	/>
)

export default Editor;