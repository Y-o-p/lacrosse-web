PGDMP      /                |            postgres    16.2    16.2 +               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4893                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    16419    coaches    TABLE     �   CREATE TABLE public.coaches (
    coach_id bigint NOT NULL,
    last_name character varying,
    first_name character varying,
    team_id bigint,
    birth_date integer,
    phone integer,
    date_created date
);
    DROP TABLE public.coaches;
       public         heap    postgres    false    5            �            1259    16424    coaches_coach_id_seq    SEQUENCE     �   ALTER TABLE public.coaches ALTER COLUMN coach_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coaches_coach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    216            �            1259    16425    games    TABLE     �   CREATE TABLE public.games (
    game_id bigint NOT NULL,
    game_date date,
    hometeam_id bigint,
    awayteam_id bigint,
    homestats_id bigint,
    awaystats_id bigint
);
    DROP TABLE public.games;
       public         heap    postgres    false    5            �            1259    16428    games_game_id_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN game_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    5            �            1259    16429    player_stats    TABLE       CREATE TABLE public.player_stats (
    playerstat_id bigint NOT NULL,
    game_id bigint,
    player_id bigint,
    goals integer,
    assists integer,
    shots integer,
    faceoffs_won integer,
    faceoffs_lost integer,
    saves integer,
    penalties integer
);
     DROP TABLE public.player_stats;
       public         heap    postgres    false    5            �            1259    16432    player_stats_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.player_stats ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_stats_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    220            �            1259    16433    players    TABLE       CREATE TABLE public.players (
    player_id bigint NOT NULL,
    team_id bigint,
    last_name character varying,
    first_name character varying,
    pos character(1),
    height double precision,
    weight double precision,
    birth_date date,
    playerstats_id bigint
);
    DROP TABLE public.players;
       public         heap    postgres    false    5            �            1259    16438    players_player_id_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN player_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    222            �            1259    16469    scorebook_sessions    TABLE     �   CREATE TABLE public.scorebook_sessions (
    session_id integer NOT NULL,
    game_id integer,
    expire_time integer,
    coach_id bigint,
    room_code character varying
);
 &   DROP TABLE public.scorebook_sessions;
       public         heap    postgres    false    5            �            1259    16468 !   scorebook_sessions_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.scorebook_sessions_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.scorebook_sessions_session_id_seq;
       public          postgres    false    5    231                        0    0 !   scorebook_sessions_session_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.scorebook_sessions_session_id_seq OWNED BY public.scorebook_sessions.session_id;
          public          postgres    false    230            �            1259    16439 
   team_stats    TABLE     �   CREATE TABLE public.team_stats (
    teamstats_id bigint NOT NULL,
    game_id bigint,
    team_id bigint,
    goals integer,
    assists integer,
    shots integer,
    timeouts integer,
    field character varying
);
    DROP TABLE public.team_stats;
       public         heap    postgres    false    5            �            1259    16444    team_stats_teamstats_id_seq    SEQUENCE     �   ALTER TABLE public.team_stats ALTER COLUMN teamstats_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.team_stats_teamstats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    224            �            1259    16445    teams    TABLE     q   CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying,
    coach_id bigint
);
    DROP TABLE public.teams;
       public         heap    postgres    false    5            �            1259    16450    teams_team_id_seq    SEQUENCE     �   ALTER TABLE public.teams ALTER COLUMN team_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    226            �            1259    16451    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_name character varying,
    pword character varying,
    role_id integer,
    coach_id bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    16456    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228    5            t           2604    16472    scorebook_sessions session_id    DEFAULT     �   ALTER TABLE ONLY public.scorebook_sessions ALTER COLUMN session_id SET DEFAULT nextval('public.scorebook_sessions_session_id_seq'::regclass);
 L   ALTER TABLE public.scorebook_sessions ALTER COLUMN session_id DROP DEFAULT;
       public          postgres    false    230    231    231                      0    16419    coaches 
   TABLE DATA           l   COPY public.coaches (coach_id, last_name, first_name, team_id, birth_date, phone, date_created) FROM stdin;
    public          postgres    false    216   �0       
          0    16425    games 
   TABLE DATA           i   COPY public.games (game_id, game_date, hometeam_id, awayteam_id, homestats_id, awaystats_id) FROM stdin;
    public          postgres    false    218   �0                 0    16429    player_stats 
   TABLE DATA           �   COPY public.player_stats (playerstat_id, game_id, player_id, goals, assists, shots, faceoffs_won, faceoffs_lost, saves, penalties) FROM stdin;
    public          postgres    false    220   1                 0    16433    players 
   TABLE DATA           }   COPY public.players (player_id, team_id, last_name, first_name, pos, height, weight, birth_date, playerstats_id) FROM stdin;
    public          postgres    false    222   81                 0    16469    scorebook_sessions 
   TABLE DATA           c   COPY public.scorebook_sessions (session_id, game_id, expire_time, coach_id, room_code) FROM stdin;
    public          postgres    false    231   U1                 0    16439 
   team_stats 
   TABLE DATA           l   COPY public.team_stats (teamstats_id, game_id, team_id, goals, assists, shots, timeouts, field) FROM stdin;
    public          postgres    false    224   2                 0    16445    teams 
   TABLE DATA           =   COPY public.teams (team_id, team_name, coach_id) FROM stdin;
    public          postgres    false    226   p2                 0    16451    users 
   TABLE DATA           M   COPY public.users (user_id, user_name, pword, role_id, coach_id) FROM stdin;
    public          postgres    false    228   �2       !           0    0    coaches_coach_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coaches_coach_id_seq', 1, true);
          public          postgres    false    217            "           0    0    games_game_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.games_game_id_seq', 1, false);
          public          postgres    false    219            #           0    0    player_stats_playerstat_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.player_stats_playerstat_id_seq', 1, false);
          public          postgres    false    221            $           0    0    players_player_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.players_player_id_seq', 1, false);
          public          postgres    false    223            %           0    0 !   scorebook_sessions_session_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.scorebook_sessions_session_id_seq', 15, true);
          public          postgres    false    230            &           0    0    team_stats_teamstats_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.team_stats_teamstats_id_seq', 13, true);
          public          postgres    false    225            '           0    0    teams_team_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.teams_team_id_seq', 1, false);
          public          postgres    false    227            (           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    229            x           2606    16474 *   scorebook_sessions scorebook_sessions_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.scorebook_sessions
    ADD CONSTRAINT scorebook_sessions_pkey PRIMARY KEY (session_id);
 T   ALTER TABLE ONLY public.scorebook_sessions DROP CONSTRAINT scorebook_sessions_pkey;
       public            postgres    false    231            v           2606    16459    team_stats team_stats_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.team_stats
    ADD CONSTRAINT team_stats_pkey PRIMARY KEY (teamstats_id);
 D   ALTER TABLE ONLY public.team_stats DROP CONSTRAINT team_stats_pkey;
       public            postgres    false    224               +   x�3��HM���J-.N�4���!##]#]CK�=... �Br      
      x������ � �            x������ � �            x������ � �         �   x�U���0Eם�1:}-%(h�A�A��;������{�h���Uby�A%����L�u��N�TF�L�A��gj
���`j�懦1m WG���X7�K�%�q�MM�k����Imh�= �"��ax�/��h�V��uߥ�T����5p~oCΠ@q����;�0Vn&\R,' ��GH         D   x�3�4@�%��%\F(B�y�y��y\�XEM���b5�*j�U���%VQC�؅�{���b���� �<�            x������ � �            x������ � �     