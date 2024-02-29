PGDMP  #                    |            master    16.1    16.1      �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16399    master    DATABASE     �   CREATE DATABASE master WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE master;
                postgres    false            �            1259    16578    coaches    TABLE     �   CREATE TABLE public.coaches (
    coach_id bigint NOT NULL,
    last_name character varying,
    first_name character varying,
    team_id bigint,
    birth_date date,
    phone character varying,
    date_created date
);
    DROP TABLE public.coaches;
       public         heap    postgres    false            �            1259    16577    coaches_coach_id_seq    SEQUENCE     �   ALTER TABLE public.coaches ALTER COLUMN coach_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coaches_coach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16596    games    TABLE     �   CREATE TABLE public.games (
    game_id bigint NOT NULL,
    game_date date,
    game_field character varying,
    hometeam_id bigint,
    awayteam_id bigint
);
    DROP TABLE public.games;
       public         heap    postgres    false            �            1259    16595    games_game_id_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN game_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    16602    player_stats    TABLE       CREATE TABLE public.player_stats (
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
       public         heap    postgres    false            �            1259    16601    player_stats_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.player_stats ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_stats_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    16590    players    TABLE     �   CREATE TABLE public.players (
    player_id bigint NOT NULL,
    team_id bigint,
    last_name character varying,
    first_name character varying,
    pos character(1),
    height double precision,
    weight double precision,
    birth_date date
);
    DROP TABLE public.players;
       public         heap    postgres    false            �            1259    16589    players_player_id_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN player_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    16606 
   sk_session    TABLE     �   CREATE TABLE public.sk_session (
    playerstat_id bigint NOT NULL,
    game_id bigint,
    coach_id bigint,
    room_code character varying,
    expire_time bigint
);
    DROP TABLE public.sk_session;
       public         heap    postgres    false            �            1259    16605    sk_session_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.sk_session ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sk_session_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    16584    teams    TABLE     �   CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying,
    coach_id bigint,
    wins integer,
    losses integer
);
    DROP TABLE public.teams;
       public         heap    postgres    false            �            1259    16583    teams_team_id_seq    SEQUENCE     �   ALTER TABLE public.teams ALTER COLUMN team_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    16572    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_name character varying,
    pword character varying,
    role_id integer,
    coach_id bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16571    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �          0    16578    coaches 
   TABLE DATA           l   COPY public.coaches (coach_id, last_name, first_name, team_id, birth_date, phone, date_created) FROM stdin;
    public          postgres    false    218   �#       �          0    16596    games 
   TABLE DATA           Y   COPY public.games (game_id, game_date, game_field, hometeam_id, awayteam_id) FROM stdin;
    public          postgres    false    224   �#       �          0    16602    player_stats 
   TABLE DATA           �   COPY public.player_stats (playerstat_id, game_id, player_id, goals, assists, shots, faceoffs_won, faceoffs_lost, saves, penalties) FROM stdin;
    public          postgres    false    226   �#       �          0    16590    players 
   TABLE DATA           m   COPY public.players (player_id, team_id, last_name, first_name, pos, height, weight, birth_date) FROM stdin;
    public          postgres    false    222   $       �          0    16606 
   sk_session 
   TABLE DATA           ^   COPY public.sk_session (playerstat_id, game_id, coach_id, room_code, expire_time) FROM stdin;
    public          postgres    false    228   $$       �          0    16584    teams 
   TABLE DATA           K   COPY public.teams (team_id, team_name, coach_id, wins, losses) FROM stdin;
    public          postgres    false    220   A$       �          0    16572    users 
   TABLE DATA           M   COPY public.users (user_id, user_name, pword, role_id, coach_id) FROM stdin;
    public          postgres    false    216   ^$       �           0    0    coaches_coach_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coaches_coach_id_seq', 1, false);
          public          postgres    false    217            �           0    0    games_game_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.games_game_id_seq', 1, false);
          public          postgres    false    223            �           0    0    player_stats_playerstat_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.player_stats_playerstat_id_seq', 1, false);
          public          postgres    false    225            �           0    0    players_player_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.players_player_id_seq', 1, false);
          public          postgres    false    221            �           0    0    sk_session_playerstat_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.sk_session_playerstat_id_seq', 1, false);
          public          postgres    false    227            �           0    0    teams_team_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.teams_team_id_seq', 1, false);
          public          postgres    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    215            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     