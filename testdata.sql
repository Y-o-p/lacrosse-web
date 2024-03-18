DO $$
	DECLARE uah_team_id bigint;
	DECLARE bad_team_id bigint;
	DECLARE blue_coach_id bigint;
	DECLARE bad_coach_id bigint;
BEGIN
	INSERT INTO public.teams(team_name)
	VALUES ('UAH')
	RETURNING team_id INTO uah_team_id;

	INSERT INTO public.teams(team_name)
	VALUES ('Bad Team')
	RETURNING team_id INTO bad_team_id;

	INSERT INTO public.coaches(last_name, first_name, team_id)
	VALUES ('Blue', 'Charger', uah_team_id)
	RETURNING coach_id INTO blue_coach_id;
	
	INSERT INTO public.coaches(last_name, first_name, team_id)
	VALUES ('Coach', 'Bad', bad_team_id)
	RETURNING coach_id INTO bad_coach_id;

	UPDATE public.teams
	SET coach_id = blue_coach_id
	WHERE team_id = uah_team_id;
	
	UPDATE public.teams
	SET coach_id = bad_coach_id
	WHERE team_id = bad_team_id;

	INSERT INTO public.users(user_name, pword, role_id, coach_id)
	VALUES ('blue', 'ident', 1, blue_coach_id), ('bad', 'ident', 1, bad_coach_id);

	INSERT INTO public.games(game_date, game_field, hometeam_id, awayteam_id)
	VALUES ('1999-10-03', 'UAH', uah_team_id, bad_team_id);
END $$;
