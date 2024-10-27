import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Description = ( { settings, desc = '', updateCallback } ) => {

	return (
		<TextareaControl
			label={ __( 'Description', 'gutenberg-explore' ) }
			help={ __( 'Main description help text.', 'gutenberg-explore' ) }
			value={ desc }
			onChange={ ( value ) => updateCallback( {
				...settings,
				desc: value
			} ) }
			className="regular-text"
		/>
	);

}
export default Description;