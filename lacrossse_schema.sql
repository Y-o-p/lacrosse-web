PGDMP  $    7                |           master    16.1    16.1 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                   pg_database_owner    false    4            �            1259    16733    coaches    TABLE     �   CREATE TABLE public.coaches (
    coach_id bigint NOT NULL,
    last_name character varying,
    first_name character varying,
    team_id bigint,
    email character varying,
    phone character varying,
    date_created date
);
    DROP TABLE public.coaches;
       public         heap    postgres    false    4            �            1259    16732    coaches_coach_id_seq    SEQUENCE     �   ALTER TABLE public.coaches ALTER COLUMN coach_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.coaches_coach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218    4            �            1259    16751    games    TABLE     !  CREATE TABLE public.games (
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
       public         heap    postgres    false    4            �            1259    16750    games_game_id_seq    SEQUENCE     �   ALTER TABLE public.games ALTER COLUMN game_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_game_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    222            �            1259    16781    player_stats    TABLE     �  CREATE TABLE public.player_stats (
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
       public         heap    postgres    false    4            �            1259    16780    player_stats_playerstat_id_seq    SEQUENCE     �   ALTER TABLE public.player_stats ALTER COLUMN playerstat_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_stats_playerstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    228            �            1259    16771    players    TABLE     ]  CREATE TABLE public.players (
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
       public         heap    postgres    false    4            �            1259    16770    players_player_id_seq    SEQUENCE     �   ALTER TABLE public.players ALTER COLUMN player_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.players_player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    226            �            1259    16761 
   sk_session    TABLE     �   CREATE TABLE public.sk_session (
    session_id bigint NOT NULL,
    game_id bigint,
    coach_id bigint,
    room_code character varying,
    expire_time bigint
);
    DROP TABLE public.sk_session;
       public         heap    postgres    false    4            �            1259    16760    sk_session_session_id_seq    SEQUENCE     �   ALTER TABLE public.sk_session ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sk_session_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224    4            �            1259    16739    teams    TABLE     �   CREATE TABLE public.teams (
    team_id bigint NOT NULL,
    team_name character varying,
    coach_id bigint,
    wins integer,
    losses integer
);
    DROP TABLE public.teams;
       public         heap    postgres    false    4            �            1259    16738    teams_team_id_seq    SEQUENCE     �   ALTER TABLE public.teams ALTER COLUMN team_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teams_team_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    220            �            1259    16727    users    TABLE     �   CREATE TABLE public.users (
    user_id bigint NOT NULL,
    user_name character varying,
    pword character varying,
    role_id integer,
    coach_id bigint
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16726    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    216            �          0    16733    coaches 
   TABLE DATA           g   COPY public.coaches (coach_id, last_name, first_name, team_id, email, phone, date_created) FROM stdin;
    public          postgres    false    218   �'       �          0    16751    games 
   TABLE DATA           �   COPY public.games (game_id, game_date, game_field, hometeam_id, awayteam_id, published, refs, scorekeepers, timekeepers) FROM stdin;
    public          postgres    false    222   �(       �          0    16781    player_stats 
   TABLE DATA              COPY public.player_stats (playerstat_id, game_id, player_id, team_id, goals, assists, shots, shots_on_goal, ground_balls, turnovers, turnovers_caused, clears_attempted, clears_made, faceoffs_won, faceoffs_lost, penalties, saves, goals_allowed) FROM stdin;
    public          postgres    false    228   �)       �          0    16771    players 
   TABLE DATA           �   COPY public.players (player_id, team_id, last_name, first_name, pos, height, weight, jersey_num, clg_class, major, home_town) FROM stdin;
    public          postgres    false    226   N6       �          0    16761 
   sk_session 
   TABLE DATA           [   COPY public.sk_session (session_id, game_id, coach_id, room_code, expire_time) FROM stdin;
    public          postgres    false    224   �E       �          0    16739    teams 
   TABLE DATA           K   COPY public.teams (team_id, team_name, coach_id, wins, losses) FROM stdin;
    public          postgres    false    220   �E       �          0    16727    users 
   TABLE DATA           M   COPY public.users (user_id, user_name, pword, role_id, coach_id) FROM stdin;
    public          postgres    false    216   :F       �           0    0    coaches_coach_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.coaches_coach_id_seq', 4, true);
          public          postgres    false    217            �           0    0    games_game_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.games_game_id_seq', 7, true);
          public          postgres    false    221            �           0    0    player_stats_playerstat_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.player_stats_playerstat_id_seq', 449, true);
          public          postgres    false    227            �           0    0    players_player_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.players_player_id_seq', 164, true);
          public          postgres    false    225            �           0    0    sk_session_session_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.sk_session_session_id_seq', 1, true);
          public          postgres    false    223            �           0    0    teams_team_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.teams_team_id_seq', 4, true);
          public          postgres    false    219            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public          postgres    false    215            �   �   x�M˽
�0����^�$�mҡ��s�.Q�j5�$���7�E8p8/����-n��{�������&�^��$��J���g\��D����0j�f��%�6L�l�H$�z�["U�����[���&r���$e;�.N���q���>c���7�ӌ��V݃&I��~BB      �      x���Ao�0��鯰z�Z\7�i!`���j��&()�2��/�Nh�v���u���{^���6�Jix�$�+ؗ��R	sL(6Y��1���:��+%6�_~�c��a��ܴ�o���r����T�.�`9e>�V�	��"ʕ�(`�������(E��&g�3+�Q"O��jZ��4V���(����'t�Ʈ�����ubjX��oa�@�4ثݎ�}?�q�$`�&Gͳba�}v�|�"��W�Zm���'��O���5��kS����º�8��E��      �   �  x��[m��(�mf��%�	���Xw`���5�v�#�Z�N�a����^����:��|��;���*_d�pXB���I���Kh��4y���A^>d����(���;V�Q���<{DUY��4hf��.T!*SV=z�E�� _&aO�Z�?���+�9`)�#�h���A�̈́�-0Rb3d�K�jKB���q])#�[9�懯Y��Q}"�n���X(��W�����J�����y)�
�OR`֜�r
)0���{hU�R`��7����on�?��~QKR���H�PR`� sON!V�& �;�1�4Hڡ�[��$�oq�D��#��g\�0�`GN�>u��0�����D�U��H�T��5�i����hw�̝�<Ȩ܎.G�Lw�\57��d9F'@e����7��9:����dRA�!��J�G��qX�Y�eܧ�cR��������I�y�+g_���أ�!+��{9��2��O��,Z=����4���� ����z�@���F��Xw7;��x��z�� �3�|�(��2ڢ�a]W�0��ގ���Oc�����}@����Z*����һ��ct�N�t�_�GŧW*[���ܢ'M�w������*�[l_/�\���Gi!�Z0�E�>���gY�w�Rm!�2����@̃�]�IP���>��-ř�zzd�E��S���G�(X?t��#�,X?�:�x���^1��� ���D��/ZdAL9�y~��a��zk�ry9��o��?5�ʹ�À(2�-��33�/��z�3���m
�a�nr�kA��Ld�w�:�Q:�~r�Ό֩�]QPʖ�	�3��Ⱦ�U9v=}a�7����U�S���zT��a&/��ۇ�i+���*>;�&�k�bW��M6����g/EX&�O���g�Y[uZG��V�j��v�O��aF�Z��]��5�����O�����K.�OC�#{�uJ���$c�>��W��$V�Oy��ɢ������{�n�i��V�7I�B������Y��r��|BvE9�˶v�r�i|�A�0s;�py(���Z�P��Z���-kD4��]M)�۷��F�Kv=���9�6���6O�n�&t�2�����£C�+��D�/����u�z�]Kg,LMp���P�0���,��C����֭=u�����1��׫6i���&�i���"��{�\0����ݠ�a�aj����@�K��v0����[�$$\�y(������+H׻kۺ������v�[�r��~�~�����?���A
楎dN�6�s�޼�[�*��]�׬R�P�H����:���&��ԇ��s��8��w�W�0��n�Ϥ������@F��i~��ui��o��x�|?�{611oW�٘��^mE �=��ς��`"����<tYv�UVݲ��)�s �����P}݈��]�W�~�f�:�:�V?ñ�P\(`�{2��Q�����r�|�"[��.��9�?��B��r�;��H�w��ͩ6��������+{���Ib0�۴o���n��w�
?3{⣈u'���..4*$|m%�aK+�1HS+����ط�-�.hXZ�ݩ�A�lc��!�������ͼa�����ϔf3h�+�j��ؒA���͠�n��TX�
��x����Y����C��m0�[	�d����z.�[2-Hg���s���~�ӽ��9�-��������.#Q֙��C{�¤ވ���neZ4�*1���gRf(1�^���{���_��v�^�����e�`�sY\�e�~}$�[9��#�n�!��ן�1$dY7<�E	�>�VE7�Z"�*��H��c�B������]�EXHF�Vqa���<0R�ϝ�BB��O���r�K���6B����Oi #��[Yaϒ���P�ۛ4����b�������"7f���b|�]�q]�>a`!v��%Z�0=+�_,�z����М�X�O8�CXHダ�MXH���ۧ ā������n,���CX�,�Fq`�=YR��z��B�w�C�B��[��,���
yN�!�_4xА���*_0�P� �*�ACY��6��AC��E<Kv'�o%�0r�>��п,y�â��A�E5<z�������_�uRt�:e��V�ӷӁ��u`��j0�Fс�@�u`N�NE �r�9/f�˾XtX~FK��4��:,��J;pbQ����i�G<��#:m��.B:����-:(�>+�T����+4pӡ�Fh��&`��%aJu���Oe��ɠLg�Y�+d����}��
�N�B�U:8�Neg`\���Y�C�4_��x���7��u�Ua8�^��ܤ��aߡ���p�� _��Y��,2�V2�A�H
��B��f�:����g����,��u�.�!��A���4��w�1��8�8��!�t��"��7��Eo�PT�+���p��
l�T���©�:n�t����(�.O
t��t��(}�uyǳ{��}�N� ;���nYu7��Xt�F��;
(\]t]I�D��n��3,�e���.�>�ӹ���N�>87s�����tg@�ו�ݷ�\X𦛻�e����o^�~-]R�~��<]h
�-��M�[ХoQW�>u�±��́��K;v�:;8���wK��y�dҵ�&��>�t%����lp���[���[ oYY.��Y�*����- ފ.�"�Vtw����2�#��*�Ɉ�u)[����2�#�+�l��!i�C�7���o�c�H��H�Kv��\��m
�\�xS�ޔ9*�7]'�/xS����f��ɛ�2xS�8�)��ޔ�:�7e����2�gp�l�39V� ޔ����:(�M��(�7o������7e�*�M9��o\(�0+kao�Z�xӍN�@]��A������F������FvBpց)Yt�=���̝��mݯV��t�7�[�x����l&��(�-��B���lG5D����|��3t=�7�����0J[��L_6J_v�rс��(}�n�Q�o�;��:�Zmo X���+:�Y*lt
����ڑk���Qѩ�����g�9]�p���{��ݿ�`�����Fgd�ݬ�n������S�3�DwA��t9��(ʄ�����*��B��NeG���yF��.���y���%�      �   [  x�}ZMw�<S�B��L����>��ڒǱ��l^.��Q���ȿ>U ʳ޼�\�l��]]]��8�����utw.d4�Fq��*ژ�ѿ����M��/��^�������E�o�(]���o�"��Q�ԧ�Z���� �U-��*�h�FQru%ѭ3�kS�B5է�����~1�6J��h!^ծ�(ˢ�ݚ<��$��y���Yc��^�2Z[��Y���_��1��x����U��\�K��WQm��m�#�Z8�,臌�9H�`2ʢa�t'܋R���ԟ��1��v/yۙ�,i�X��ޫ�Z�Zo�	/-��zS:z�����3�&�n۠os#���Vd{�3���)�GQ�`��i�#&����0uk�\ύP����}岝|ۘ�޼4y�&ne�����4e]�"4�SZ�Ȧ[����K�&!Q��e�K�?ɟ������+Q��*� '�����S)�{��?�4���p�iQ;�����[-�md�0|W	�M-_%[yv�1v<l�cw���?7R�Y�����^ ��G�0q��=���,��ӧ��E"a)
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