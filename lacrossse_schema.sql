PGDMP  !                    |           master    16.1    16.1 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                   pg_database_owner    false    4            �            1259    16796    coaches    TABLE     �   CREATE TABLE public.coaches (
    coach_id bigint NOT NULL,
    last_name character varying,
    first_name character varying,
    team_id bigint,
    email character varying,
    phone character varying,
    date_created date
);
    DROP TABLE public.coaches;
       public         heap    postgres    false    4            �            1259    16795    coaches_coach_id_seq    SEQUENCE     �   ALTER TABLE public.coaches ALTER COLUMN coach_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coaches_coach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    4            �            1259    16814    games    TABLE     !  CREATE TABLE public.games (
    game_id bigint NOT NULL,
    game_date date,
    game_field character varying,
    hometeam_id bigint,
    awayteam_id bigint,
    published boolean,
    refs character varying[],
    scorekeepers character varying[],
    timekeepers character varying[]
);
    DROP TABLE public.games;
       public         heap    postgres    false    4            �            1259    16813    games_game_id_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN game_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224    4            �            1259    16820    player_stats    TABLE     �  CREATE TABLE public.player_stats (
    playerstat_id bigint NOT NULL,
    game_id bigint,
    player_id bigint,
    team_id bigint,
    goals integer,
    assists integer,
    shots integer,
    shots_on_goal integer,
    ground_balls integer,
    turnovers integer,
    turnovers_caused integer,
    clears_attempted integer,
    clears_made integer,
    faceoffs_won integer,
    faceoffs_lost integer,
    penalties integer,
    saves integer,
    goals_allowed integer
);
     DROP TABLE public.player_stats;
       public         heap    postgres    false    4            �            1259    16819    player_stats_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.player_stats ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_stats_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    4            �            1259    16808    players    TABLE     ]  CREATE TABLE public.players (
    player_id bigint NOT NULL,
    team_id bigint,
    last_name character varying,
    first_name character varying,
    pos character(1),
    height double precision,
    weight double precision,
    jersey_num integer,
    clg_class character varying,
    major character varying,
    home_town character varying
);
    DROP TABLE public.players;
       public         heap    postgres    false    4            �            1259    16807    players_player_id_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN player_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222    4            �            1259    16824 
   sk_session    TABLE     �   CREATE TABLE public.sk_session (
    session_id bigint NOT NULL,
    game_id bigint,
    coach_id bigint,
    room_code character varying,
    expire_time bigint
);
    DROP TABLE public.sk_session;
       public         heap    postgres    false    4            �            1259    16823    sk_session_session_id_seq    SEQUENCE     �   ALTER TABLE public.sk_session ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sk_session_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    228            �            1259    16802    teams    TABLE     �   CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying,
    coach_id bigint,
    wins integer,
    losses integer
);
    DROP TABLE public.teams;
       public         heap    postgres    false    4            �            1259    16801    teams_team_id_seq    SEQUENCE     �   ALTER TABLE public.teams ALTER COLUMN team_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220    4            �            1259    16790    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_name character varying,
    pword character varying,
    role_id integer,
    coach_id bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16789    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    216            �          0    16796    coaches 
   TABLE DATA           g   COPY public.coaches (coach_id, last_name, first_name, team_id, email, phone, date_created) FROM stdin;
    public          postgres    false    218   �'       �          0    16814    games 
   TABLE DATA           �   COPY public.games (game_id, game_date, game_field, hometeam_id, awayteam_id, published, refs, scorekeepers, timekeepers) FROM stdin;
    public          postgres    false    224   �(       �          0    16820    player_stats 
   TABLE DATA              COPY public.player_stats (playerstat_id, game_id, player_id, team_id, goals, assists, shots, shots_on_goal, ground_balls, turnovers, turnovers_caused, clears_attempted, clears_made, faceoffs_won, faceoffs_lost, penalties, saves, goals_allowed) FROM stdin;
    public          postgres    false    226   �)       �          0    16808    players 
   TABLE DATA           �   COPY public.players (player_id, team_id, last_name, first_name, pos, height, weight, jersey_num, clg_class, major, home_town) FROM stdin;
    public          postgres    false    222   �1       �          0    16824 
   sk_session 
   TABLE DATA           [   COPY public.sk_session (session_id, game_id, coach_id, room_code, expire_time) FROM stdin;
    public          postgres    false    228   _A       �          0    16802    teams 
   TABLE DATA           K   COPY public.teams (team_id, team_name, coach_id, wins, losses) FROM stdin;
    public          postgres    false    220   |A       �          0    16790    users 
   TABLE DATA           M   COPY public.users (user_id, user_name, pword, role_id, coach_id) FROM stdin;
    public          postgres    false    216   �A       �           0    0    coaches_coach_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coaches_coach_id_seq', 4, true);
          public          postgres    false    217            �           0    0    games_game_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.games_game_id_seq', 5, true);
          public          postgres    false    223            �           0    0    player_stats_playerstat_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.player_stats_playerstat_id_seq', 245, true);
          public          postgres    false    225            �           0    0    players_player_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.players_player_id_seq', 164, true);
          public          postgres    false    221            �           0    0    sk_session_session_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.sk_session_session_id_seq', 1, false);
          public          postgres    false    227            �           0    0    teams_team_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.teams_team_id_seq', 4, true);
          public          postgres    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public          postgres    false    215            �   �   x�M��
�0D��$�I|���
���&jZ�&��P������gN�8��Vn�	&���
����iFJ.	� g����0���6kp�g�?=�n��j2��e[�\�"+I��� pv�o�z5L���|�`6��H\��)�DU�N[H4�kg�ڷ������$)+��~�$I~�BB      �     x���KO�@���_q�5h�c�T��6ln�+�tdf �����������=�9#��?���!�q���s%�Y�{�t�`�%�>��0�=W0��S�J�?/���Uk)� |g�?A��)���BP�S�Q�pUh� '�G�Ǵ�ǝ���+4r����˘)���h�BK2�D���YHQ�Y�'t�֯���w�Mi[X����a_��r��vK���B���hx�"St���ϑ�ȸ]�4Fo������z�Y�F      �   <  x��Zk��*��,�V��^����ڭ���I���̤"8�2���r�����>��

o�%|V�%*Ȃ�&��"�}!]��<ߘAZ�d�ȟ�@�+(�~�m�H�o��QUV"*�=�z��J�UW�^v�e(��I�n����iv�� /,�py.mV�~����F
|hF�LS$��0d�w�ؖ��H�iWa� <xt�!�^�+<�j��4��CԽN�^�4�`ֳ�fo��sn��ٽH�³tq!�mqb7���,<~q�mdቄ՗�򷐅��Ԑ׾��b_�,<y�ٝ�[ȁ��^f��Ƃ��F I[�t�X�d�+N��Y�e0����#f$U�U�+�?D����oK��-���AF��%2ꦱeI��i�NS�:�k���O��䞫��Y-&�r-�x=�o��|��-��w�iQ5��=p-�辽���۞{�o�P��úw��r7�Y�z����8e�]��md}����+o�Qa w{��J�N4z�7������L.q�a}m��o�U�=�/g�ے0��4�S�.�ǣ��mX����>.���@��C[1��0��G*[��Ԣ'N�� Ƨ�!S9�Ul_7�T���i!f[0��>����,D��C���v08��w �A�v�D�K��o?Vߢ�P=n�f�?B����Ԩ����=�ɂ�cl�#��a���z5����@?4���Z�dAL9�<?Ae��Z�5�)V��7U�㊿#����a@d��Uܝ����,5ݝ`������N0~�/9�YP0>Y��v�$�S=�$�;�r�Q;�T��y.����LwF$�쬇�\ZU�e��l���,��x,=��3��'-��ˇ�f˞�^)�GG��J�+�3E�͕��q,�K��~�2�ם�R7�U4��oխ��kA��efĩ���jnS:�����H�(=Ĳ.�751[��k�`�{$c�>��+wu#�S鰲��|Xw�]��4�L;��$PP��x���.�ϓ_Ȯ(ˆ�ԊU�ޏ�0��aV�����@+�	���A:�wY#���je4a�`.�4p��Cv����N�6Q�w�\��E�	#O��0�Nxt�yHӜ�a �Ǣ��wm��X+錀����.
��v�ePHñ�Z˺���!5���}-3H>n�I�켕�[�1V��'�)0���j���0�0֪'Y�`�d8X�PG+JB�����E��p׻f� m��M��iu9�>U�r��~�zpǱyv�Y�� �RG2'M�͹jo^ǹf���]8٬RO(sł�-(�6�a�I�:u~���;�6q���h�]�-���}������dĭ��M?L�g߅��
�|x7�ۋ����j6&�X�!uO%�7b=L�<cUbOB�<㜛.�ʳʪS�~tʵ7�UV�
����F��!���r�6�������/uBQP��w2|�(�i�9��*��8�8�S��$�U[�t:����~�SM��������=c����$2�kړn$�����
����#/#֙�.�Y\h&T
$�YJx���RB1HS)�����K�|�]�RB[4�\�)IlB�4��i�֪�~]�I��Nī���%����I��N�u
*,C�VJ���x���>�V��
,8�`V	�d��j����d�C�L3�;��b��۱�q����ALƬ/�����\B��=i��tg���ވ������4hК*y�uWR�pĤwl$��Ié���-�;j8����a�`�uy��}|$�[���-�6㐇���q�<$d7��"	�ލVE�u	9��8"s��P\�� �H��RaM ��\��Ȉ��'���H�X����B|���[1�@�;���R�0������K���NǢk�8�V-"�§W��4�����S��W<�{�h�`�3�RW�B��ꐆ0�Xu����rJ�"`a�+��o,��=}��=hn�<��uQ�x��Ԃ��/VO�!,D�+ۃ�,X���C,X�.�G,Xh7B����<��ɽny�)XH��-��Ł���hp�!餾*h�� S�s�!�[]uq�!]����I�S�������F|^      �   [  x�}ZMw�<S�B��L����>��ڒǱ��l^.��Q���ȿ>U ʳ޼�\�l��]]]��8�����utw.d4�Fq��*ژ�ѿ����M��/��^�������E�o�(]���o�"��Q�ԧ�Z���� �U-��*�h�FQru%ѭ3�kS�B5է�����~1�6J��h!^ծ�(ˢ�ݚ<��$��y���Yc��^�2Z[��Y���_��1��x����U��\�K��WQm��m�#�Z8�,臌�9H�`2ʢa�t'܋R���ԟ��1��v/yۙ�,i�X��ޫ�Z�Zo�	/-��zS:z�����3�&�n۠os#���Vd{�3���)�GQ�`��i�#&����0uk�\ύP����}岝|ۘ�޼4y�&ne�����4e]�"4�SZ�Ȧ[����K�&!Q��e�K�?ɟ������+Q��*� '�����S)�{��?�4���p�iQ;�����[-�md�0|W	�M-_%[yv�1v<l�cw���?7R�Y�����^ ��G�0q��=���,��ӧ��E"a)
UV���K��E%����;+! ���)�#��Z8��MB8�d�+ᜍ��W>��c_�t�P�k"�A��I���A���� ��Q��d�6m�y����ԠN�7�
��ƌf�9��?���	og�d���]%� �6�_�&ه�M�.S�ڝ��st���]���Np��xM�ͣ/Fm���b�Ox�b��HQ��s{!� �ʃ�k`P��i�$��
�_�k{)������/���9k��qҧ���W����&DS��;�׳hb S��Q��VP�hX��M�-����{�i^�ma?I��ˍ4GP�Fp;jk�ѥ��PY��D�H��q �x��P�������ѻh)��K�����ڬ��7>	�A��)� ��Q/ݽ�����j@��D�L˝�'Oo�N`Y��������v
�y$k��P-��Q.��K6�?`5��!�6A^k�u#L2j�n�M��+e�ZP/�ǥ!�+Qn�;�v)Q�h��T� ��ɥ�w���a4`u�J�`����K/M�z�s[���۾3���о���z�s)q�Md�{���I�d�@qi��L�#����iK��G���H�pXվ�# c��x�KߓR���� 8��5��tL��]��Xoqc��=�8qu�E�}�'�T��_j���*�2��k�y�#�,������Z�8X�RK$�X�� <	6F��x���T�μk�������L�K8�2�mD�ѝ�՚��ǉ�n t���7x�f ��ќsq�� �%�4ܦ1?ڒtv �h�K�-�e4��;7�6p�B���!�g5�5���NX�|GIY
����p���VU��z�Ak�R��`~%���O��)gx~.����i���E/���I��ˀ�;�KLI-����8JsqN��.�[蒻?z٘6�d����N�f��s� e�֫��*��^4&Fy�2��b���T�Sr	-���4['D��@�0�B��$[p�
:�G�q��[s��Q�U��-t�����6?���GUJ�[[Ui!��3�����<��V�;߆�N
tA��&�S��»�1��zá��VZ%�@��]��hlp	���!��]��۹t� $)0�w.@=h�8�8p�$��U[�I�¼9ҹv"��;Y���Ό�Y��q�$�$J4An�=*�������m�� �5?,,���p#_x�7���$t�{�?W�ʡ������=vݲ@ƁGQP���1"6%Rb��8���F��1�������������uॊ���*���(����������>����=EHW�!�	���O�썘4S�5d'�.��0����� ���=�z'+7u�.��N�(޴Ui��%�����9-O�0A���?@;Oo���� �"�����u3Z�a>$��[z|l�����;q�O�*���c�%6�!_w�PCw���%xlY�Ek�⽲�ui���( bm�)����u��\��Opk�%�/�^�z�wZ}{s�D�h��B ����Phz�1>&,���5gd8��s^~	�H��}�&�草��,D��U�Y��(?tBm&81<�f�մ��
�y�i^^>4���WNsN,9�B��n�pgdqG'�_��_'V���q���:b��/��!AL��1q�]cY�3Ҏ��FdvB <(�P]�]% _�R��vD�� NE�Ԯ,�e�1�]����VUޛ#N���,즈z�e�կ�q�]ш�D�
-�"zH�Fbɤ�j�]��K�1�$���Y�J�/�4�vq�b����d�G}F^f�l���b��C�m�Ӣ�;)�'�w�	�س��]Ǿ�T����$��F��Km7zL�:!w�Pi?��W	L���fu���@��$�h+���l�K|5��w��8�uL�:�	8��AJ�jy��x�JH���8�pH������ ݠ8q�;� ;���k��ѻ��o���x|EH\�dYPW^�����o����*	%a���T�^o���+76�Wc�EQ��D�����(햞���
������[��!�˦��K��_�V��o�yR��H�	��F�B8����|����ńō~�!�3�~C�N�m���>wG�.م�I�6W��m���8Nm�)W��p�6@٥�ʥ9A���;�N$<Z>� D*�~�9���6�.((�+��2杤�u�A���]��]W�^Ƅ�A�}m�a�u��-����D�Z��_ O,�@n����ۍ,1����-�$��&R���妘���H%/�&�Mm��#�<2!J7mW_��M΃ 1����j�(b˥��v�Q��a��IXAAbdn�%�����r�Z�#P�ӝ8V.��*�?���Q��EX,��%Gz���l�a�i�e��0�j�J[>��|����Y �	qa~�i�Na��]4`���nv����[�͒#�E�%w�6�Ư����tr���;�W!!�IaX[�ݹ�d�Q5 ,69��a:�V"q�Q�0/P!���A"ܞK�P��J7G�n�x����9���)�U���x�M�
\Ѫ:P�'HAYU�Io�p��E�_�?h[��M�}R`ю'��1gˋ��v�r�:k�RB+q{�0T<pi,U���S:f�ͳ���X�mS��3��+�4�;*���\�ۆt����k����<<0u�v9�Ɛ�i�6Э$��8���bĨ�����-��
c.\3��@�S'C���/��w|�/��O��gn'�"�R�w(a��������)�%U��Y��G�:�����c�[w��#F�2x�R�1qM�B�]4��7R���gj�y�'#�'�{x��[�|�T��W��i��5�?ӊ�]�m\t�i����t�����]&�߫g�(GwP��s�({�j�a>,Z���4�x�����ڠc�(}.���7s�*���ʾ���Ԧ�:�2ߥ� s+��E�����gF��sȁ��}����c����+VD�� � ��w�������><��)v�9��|cZ�����V���oQ��_�v���}׾����̦9�R��-�Q½�O��Ⱥ��BU�A"�F��1��]|j�����l�����+�C����� ��芡�:�'�Y�������	4���"�����F*��"����N���ظܷA�}���dbL�?`�a��l٠��O��
i�F�4�t�����+1��������)s���.��r�_����E��s������      �      x������ � �      �   T   x�3�u��4�4�4�2����K���S�M��/�L��4Jrs��'����rq�pF��+x$es�p c���� $7      �   g   x�3�L+J�u��L�H,JO-*642V�4�4�2�,��)��������K��Ƀ�qs&e'e慄rd��"4s�p���$�Dz8u����L�b���� ���     