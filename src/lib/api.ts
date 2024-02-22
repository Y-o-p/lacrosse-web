export async function getCoach(id: number): Promise<Coach> {
    return new Promise<Coach>((resolve, reject) => {
        fetch(`/api/coaches/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((row) => {
            const coach: Coach = {
                ID: BigInt(row["coach_id"]),
                teamID: BigInt(row["team_id"]),
                lastName: row["last_name"],
                firstName: row["first_name"],
                birthdate: new Date,
                createdDate: new Date
            };
            resolve(coach);
        })
        .catch((err) => reject(err));
    });
}