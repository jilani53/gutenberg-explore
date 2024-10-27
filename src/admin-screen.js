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
import Title from './general-fields/title';
import Description from './general-fields/description';

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
            <h1 className="wp-heading-inline">{ __( 'Gutenberg Explore From React!', 'gutenberg-explore' ) }</h1>

            <Title
                settings = { generalSettings }
                title={ title }
                updateCallback={ setGeneralSettings }
            />
            
            <Description
                settings = { generalSettings }
                desc={ desc }
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