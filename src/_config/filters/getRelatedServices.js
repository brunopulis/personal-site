import {getServiceById} from './getServiceById.js';

export const getRelatedServices = serviceId => {
  const service = getServiceById(serviceId);
  if (!service) return [];

  return service.relatedServices.map(relId => getServiceById(relId)).filter(Boolean);
};
