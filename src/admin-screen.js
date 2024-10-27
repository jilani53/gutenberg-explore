/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { TabPanel, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import General from './general-fields/general';

const adminScreen = () => {

    // Retrieve the general settings from the database.
    const [ generalSettings, setGeneralSettings ] = useEntityProp(
        'root',
        'site',
        'gutenberg-explore-general'
    );
    
    const { saveEditedEntityRecord } = useDispatch( 'core' );

    if ( ! generalSettings ) {
        return __( 'Loading...', 'gutenberg-explore' );
    }

    const { title, desc } = generalSettings;

    return(
        <div>
            <h1 className="wp-heading-inline">Gutenberg Explore From React!</h1>

            <General
                settings = { generalSettings }
                title={ title }
                updateCallback={ setGeneralSettings }
            />

            <Button variant="primary" onClick={ () => {
                // Now save the updated data.
                saveEditedEntityRecord('root', 'site');
            } }>{ __( 'Save', 'gutenberg-explore' ) }</Button>
        </div>
    );
};
export default adminScreen;