/** @format */

// NOTIFICATION ACTION CREATORS

import { NEW_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

/**
 * @description Action creator that Dispatches a NEW_NOTIFICATION action to the frontends notification-state along with the payload that includes message.
 * @param {Object} newNotification - The notification details
 * @param {String} newNotification.message - The notification message
 * @param {String} newNotification.isSuccess - Tells whether or not it is a succesfull (green) or unsuccessfull (red) message
 * @return {Object} action
 */
export const createNotification = (
	newNotification = { message: '', isSuccess: false }
) => ({
	type: NEW_NOTIFICATION,
	payload: newNotification
});

/**
 * @description Action creator that Dispatches a REMOVE_NOTIFICATION-type action
 * @return {Object} action
 */
export const removeNotification = () => {

	setTimeout(() => {
		return {
			type: REMOVE_NOTIFICATION
		}
	}, 5000)

};
