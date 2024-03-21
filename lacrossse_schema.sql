PGDMP  6    ;                |           master    16.1    16.1 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16399    master    DATABASE     �   CREATE DATABASE master WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE master;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16578    coaches    TABLE     �   CREATE TABLE public.coaches (
    coach_id bigint NOT NULL,
    last_name character varying,
    first_name character varying,
    team_id bigint,
    birth_date date,
    phone character varying,
    date_created date
);
    DROP TABLE public.coaches;
       public         heap    postgres    false    4            �            1259    16577    coaches_coach_id_seq    SEQUENCE     �   ALTER TABLE public.coaches ALTER COLUMN coach_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coaches_coach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    4            �            1259    16664    games    TABLE     �   CREATE TABLE public.games (
    game_id bigint NOT NULL,
    game_date date,
    game_field character varying,
    hometeam_id bigint,
    awayteam_id bigint,
    published boolean
);
    DROP TABLE public.games;
       public         heap    postgres    false    4            �            1259    16663    games_game_id_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN game_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222    4            �            1259    16676    player_stats    TABLE     W  CREATE TABLE public.player_stats (
    playerstat_id bigint NOT NULL,
    game_id bigint,
    player_id bigint,
    team_id bigint,
    goals integer,
    assists integer,
    shots integer,
    faceoffs_won integer,
    faceoffs_lost integer,
    saves integer,
    clears_attempted integer,
    clears_made integer,
    penalties integer
);
     DROP TABLE public.player_stats;
       public         heap    postgres    false    4            �            1259    16675    player_stats_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.player_stats ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_stats_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    4            �            1259    16670    players    TABLE       CREATE TABLE public.players (
    player_id bigint NOT NULL,
    team_id bigint,
    last_name character varying,
    first_name character varying,
    pos character(1),
    height double precision,
    weight double precision,
    birth_date date,
    jersey_num integer
);
    DROP TABLE public.players;
       public         heap    postgres    false    4            �            1259    16669    players_player_id_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN player_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224    4            �            1259    16680 
   sk_session    TABLE     �   CREATE TABLE public.sk_session (
    session_id bigint NOT NULL,
    game_id bigint,
    coach_id bigint,
    room_code character varying,
    expire_time bigint
);
    DROP TABLE public.sk_session;
       public         heap    postgres    false    4            �            1259    16679    sk_session_session_id_seq    SEQUENCE     �   ALTER TABLE public.sk_session ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sk_session_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    228            �            1259    16584    teams    TABLE     �   CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying,
    coach_id bigint,
    wins integer,
    losses integer
);
    DROP TABLE public.teams;
       public         heap    postgres    false    4            �            1259    16583    teams_team_id_seq    SEQUENCE     �   ALTER TABLE public.teams ALTER COLUMN team_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220    4            �            1259    16572    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_name character varying,
    pword character varying,
    role_id integer,
    coach_id bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16571    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    216            �          0    16578    coaches 
   TABLE DATA           l   COPY public.coaches (coach_id, last_name, first_name, team_id, birth_date, phone, date_created) FROM stdin;
    public          postgres    false    218   &       �          0    16664    games 
   TABLE DATA           d   COPY public.games (game_id, game_date, game_field, hometeam_id, awayteam_id, published) FROM stdin;
    public          postgres    false    222   �&       �          0    16676    player_stats 
   TABLE DATA           �   COPY public.player_stats (playerstat_id, game_id, player_id, team_id, goals, assists, shots, faceoffs_won, faceoffs_lost, saves, clears_attempted, clears_made, penalties) FROM stdin;
    public          postgres    false    226   ('       �          0    16670    players 
   TABLE DATA           y   COPY public.players (player_id, team_id, last_name, first_name, pos, height, weight, birth_date, jersey_num) FROM stdin;
    public          postgres    false    224   �)       �          0    16680 
   sk_session 
   TABLE DATA           [   COPY public.sk_session (session_id, game_id, coach_id, room_code, expire_time) FROM stdin;
    public          postgres    false    228   s-       �          0    16584    teams 
   TABLE DATA           K   COPY public.teams (team_id, team_name, coach_id, wins, losses) FROM stdin;
    public          postgres    false    220   �-       �          0    16572    users 
   TABLE DATA           M   COPY public.users (user_id, user_name, pword, role_id, coach_id) FROM stdin;
    public          postgres    false    216    .       �           0    0    coaches_coach_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coaches_coach_id_seq', 8, true);
          public          postgres    false    217            �           0    0    games_game_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.games_game_id_seq', 4, true);
          public          postgres    false    221            �           0    0    player_stats_playerstat_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.player_stats_playerstat_id_seq', 80, true);
          public          postgres    false    225            �           0    0    players_player_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.players_player_id_seq', 48, true);
          public          postgres    false    223            �           0    0    sk_session_session_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.sk_session_session_id_seq', 1, true);
          public          postgres    false    227            �           0    0    teams_team_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.teams_team_id_seq', 4, true);
          public          postgres    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);
          public          postgres    false    215            �   �   x�Mν�0���.F�i�t&V�E�Z�����-K-o����ק�p/�Pg��Z▔�1QT!13(+I2�s��i�V($�H�<[��P�ٚ�җ���	�+�{�L�Wr"f�E4�`�i�o��,�.�ٿc�$i�����+2      �   a   x�3�4202�50�5��t�H,JO-R.IL�,��4�4�,�2�*1"ΐ���Ĝ���DNcN��1� �PG'�c��	�\N��P�ZC�p� .n�      �   i  x�mU[�� �nf+�y$w���c-C�qR��I�6B��?�zd�'�Q�膓����A����ɋ�A�Fꚧ�ss����,u���9m�ܺ�1']�v%Ļ!ƫD�y%�E�0����g9�_	�N�⊅Bpso<�Rp_��6'��30�3'���g��!|�&�	l�YB��I&b��"u��� �H��O�àt����r~�\^υ{<�$S��������At�@L�ݑ��aS5a�<E-/���s�&�[�0znؽK�U����t�|��I��(�2
a��Ia�~�0�$��N
aJM�o9���0����Gi
H{�Q�����c�v����(I�`�%�(0�����ss^����<8��P�;g��ۢ�K�F�
aR�ʬW!�G�}VT�Q�s
U�Q:�)ms�Ԍ���@D�������a]Q��ᘊZQ��{���B�NQjS�S�(��L�Q��^�R��g���`�$\�Ã�C�jpLC�!I�.���Ŕ�q��?���Ŕ���y������qz�����8kE��(��Zv�w��ju�eutw_�bn���ԡH_?sE΅ݒ) r%��q|��	W7��#��+\      �   �  x�]U�N�H]�����Gy
Mf� ��fS�v�c���~�-ۉӋD��[�UV��q_m�]�|C*RR�ħ��������j����}�iE�%�gm"��Z��릩ݾ�G\�դ�8P'�$J��AW��li�>�W�rKjDe�,i)Y\����|��;G[*
�*�0J':�L��m����B��{��-�%�f��e)�����=~�5��8U%J%FR!�H�9����?iMEFZF�%s�YQ�v���_�P;-NJ��cӓ;6]�݋�V�2��b>J
���Rx�#�`(����lTRa.�VB�9OU�w=��G�J�&��i+-(�ƅF]��t=Oď���a10�{�o�{�B��ƿF�,��X`$��և��_P���UT3;�	/�P9���/� )y{J[���+X�^C�v ����f�Ed_��8j�,��M�Q� �4C�C�\��iyO7C�Z�7{�p(�s��{��[׶H�z�e��g�B+��G��t{�s���)���0\�H�oGc�
s��fk6�ٵo��`�9��˖����l�O�8��[�!������h蹪�:<+a�6�@A���{w8 ���b�X,�.��u���#�k�X����f�aN�21��h]�a}��S`�V9�b�9�7��E��\�L.����W����u��P�)V�I!�fq\�i�]��T��#��V97=��5H�z�s�M
��� K�=3_��<�YFM4a������)U�&��{�Ah��1g*�n��Ǧ�����l�8��@n�Ǉ�lёS��6%p���U�l0�6���`��^�XQܚ]�7U<q�ù�Ha!/��j�6���=�Q����֦�+ǞM/�� ���)���/��l�G򲹸Rz��R�n�uL��.��� �b�t]�#����l�u��2L퍩���)����&��5����	!�W��]      �      x������ � �      �   `   x��=@@���S�	�.B��h�i�%���O��B��\���<Rh��_,�8��,����!�X��m�_'w�l��i{�Ě�v�!4=Йb      �   p   x�Eʱ�0E���$7���.�Y�J�F6��)�]��ȭ��mVB�w�Ж{z�_�h�֔)b�!"����7��<���^�c?�f�4;�=B�D������7���H#�     