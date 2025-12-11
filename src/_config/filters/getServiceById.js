import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const services = require('../../_data/services.json');

/**
 * Returns the id form the especific service
 *
 * @author Bruno Pulis
 * @param {string} id
 * @returns string
 */
export const getServiceById = id => {
  return services.find(s => s.id === id);
};
