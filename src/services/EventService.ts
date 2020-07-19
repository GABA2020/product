import { appApi } from '../helpers/httpClients';

const getEvents = async (zone: number) => {
  const responseEvent = await appApi.get(`/api/upcoming-event?zone_id=${zone}`);
  return responseEvent.data;
};

export { getEvents };
