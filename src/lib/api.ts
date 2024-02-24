export function toJson(object: any) {
    return JSON.stringify(object, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    );
}

export async function getCoach(id: number, user: string): Promise<Coach> {
    return new Promise<Coach>((resolve, reject) => {
        fetch(`/api/coaches/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'user': user
            }
        })
        .then((response) => response.json())
        .then((row) => {
            const coach: Coach = {
                id: BigInt(row["coach_id"]),
                teamId: BigInt(row["team_id"]),
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

export async function postTeamStats(teamStats: TeamStats, user: string): Promise<BigInt> {
    return new Promise<BigInt>((resolve, reject) => {
        console.log(toJson(teamStats));
        fetch(`/api/team-stats`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'user': user
            },
            body: toJson(teamStats)
        })
        .then((response) => response.json())
        .then((row) => {
            resolve(BigInt(row["teamstats_id"]));
        })
        .catch((err) => reject(err));
    });
}