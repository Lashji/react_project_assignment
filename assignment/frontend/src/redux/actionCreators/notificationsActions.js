/** @format */

// NOTIFICATION ACTION CREATORS

import { NEW_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

/**
 * @description Action creator that Dispatches a NEW_NOTIFICATION action to the frontends notification-state along with the payload that includes message.
 * @param {object} newNotification - The notification details
 * @param {string} newNotification.message - The notification message
 * @param {string} newNotification.isSuccess - Tells whether or not it is a succesfull (green) or unsuccessfull (red) message
 * @returns {object} action
 */
export const createNotification = (
  newNotification = { message: "", isSuccess: false }
) => {
  return {
    type: NEW_NOTIFICATION,
    payload: newNotification,
  };
};

/**
 * @description Action creator that Dispatches a REMOVE_NOTIFICATION-type action
 * @returns {object} action
 */
export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION,
  };
};
