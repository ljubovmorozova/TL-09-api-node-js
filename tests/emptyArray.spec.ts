import {test, expect, APIRequestContext} from '@playwright/test';
import {UserDTO} from "./DTO/UserDTO";
import {StatusCodes} from "http-status-codes";

const baseURLWithEndpoint: string = 'http://localhost:3000/users';
const prepareEnv = async (request: APIRequestContext): Promise<void> => {
    const responseUsers = await request.get(`${baseURLWithEndpoint}`);
    const users: UserDTO[] = await responseUsers.json();
    for (let i=0; i<users.length; i++) {
        await request.delete(`${baseURLWithEndpoint}/${users[i].id}`);
    }
};
test('should return empty array when no users @empty', async ({ request }) => {
    await prepareEnv(request);
    const response = await request.get(`${baseURLWithEndpoint}`);
    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.text()
    expect(responseBody).toBe('[]');
});
