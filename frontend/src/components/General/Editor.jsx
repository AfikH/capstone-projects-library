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

const Editor = () => (
	<MDXEditor
		markdown="# Hello world"
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
		
	/>
)

export default Editor;