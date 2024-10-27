import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Title = ( { settings, title = '', updateCallback } ) => {

	return (
		<TextControl
			label={ __( 'Title', 'gutenberg-explore' ) }
			help={ __( 'Main title help text.', 'gutenberg-explore' ) }
			value={ title }
			onChange={ ( value ) => updateCallback( {
				...settings,
				title: value
			} ) }
			className="regular-text"
		/>
	);

}
export default Title;