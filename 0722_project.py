#a
import json
from pprint import pprint


def movie_info(movie):
    pass 
    # 여기에 코드를 작성합니다.    
    key_list = ['id', 'title', 'poster_path', 'vote_average', 'overview', 'genre_ids'] #해당되는 키를 리스트에 담은 것
    movie_info_dict = {} #새로운 dictionary를 담을 변수 선언
    for key in key_list: #카운터 변수 key를 key_list 수만큼 반복
        movie_info_dict[key] = movie[key] 
    return movie_info_dict #새로운 dictionary를 변환


# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='utf-8')
    movie_dict = json.load(movie_json)
    
    pprint(movie_info(movie_dict))

#b
import json
from pprint import pprint


def movie_info(movie, genres):
    pass 
    # 여기에 코드를 작성합니다.  
    key_list = ['id', 'title', 'poster_path', 'vote_average', 'overview', 'genre_ids'] 
    new_list = []
    
    movie_info_dict = {} 
    for key in key_list: 
        movie_info_dict[key] = movie[key] 

    movie_info_dict['genre_ids']
    for i in range(len(movie_info_dict['genre_ids'])):
        movie_info_dict['genre_ids'][i]
        
        for j in range(len(genres)):
            if genres[j]['id'] == movie_info_dict['genre_ids'][i]:
                genres[j]['name']
                new_list.append(genres[j]['name'])
   
    movie_info_dict['genre_names'] = new_list
    del movie_info_dict['genre_ids']
    return(movie_info_dict)
                
    
            

        

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='utf-8')
    movie = json.load(movie_json)

    genres_json = open('data/genres.json', encoding='utf-8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movie, genres_list))

#cimport json
from pprint import pprint




def movie_info(movies, genres):
    pass 
    # 여기에 코드를 작성합니다.  
    movies_info_dict = []
    for movie in movies:
       
        genre_ids = movie['genre_ids']

        gerne_names = []

        for genre in genres: 
            if genre['id'] in genre_ids:  
                gerne_names.append(genre['name']) 

        key_list = ['id', 'title', 'poster_path', 'vote_average', 'overview']

        movie_info_dict = {}

        for key in key_list:
            movie_info_dict[key] = movie[key]

        movie_info_dict['gerne_names'] = gerne_names

        movies_info_dict.append(movie_info_dict)

    return movies_info_dict




        
# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)

    genres_json = open('data/genres.json', encoding='utf-8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movies_list, genres_list))

#d
import json

from problem_a import movie_info


def max_revenue(movies):
    pass 
    # 여기에 코드를 작성합니다.  
        # 1. 변수 초기화
    max_revenue_value = 0  # 최다 수익
    max_revenue_title = '' # 최다 수익 창출 영화

    # 2. movies 순회(반복)하며, 최다 수익 영화 찾기
    for movie in movies:
        # 3. 해당 movie의 id를 이용해서 상세정보 파일 열기
        movie_detail = open("data/movies/"+str(movie['id'])+".json", encoding='UTF8') # json 파일 열기
        movie_detail_list = json.load(movie_detail)              # json to dictionary

        #  최다 수익 영화를 찾아 max_revenue_title에 해당 영화의 제목 할당
        if max_revenue_value < movie_detail_list['revenue']:
            max_revenue_value = movie_detail_list['revenue']
            max_revenue_title = movie_detail_list['title']

    return max_revenue_title








# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)
    
    print(max_revenue(movies_list))


#e
import json


def dec_movies(movies):
    pass 
    # 여기에 코드를 작성합니다.  
    # 변수 초기화
    released_dec_movies_list = []

    for movie in movies: # movies 순회(반복)하며, 12월 개봉 영화 찾기
        # 해당 movie의 id를 이용해서 상세정보 파일 열기
         movie_detail = open("data/movies/"+str(movie['id'])+".json", encoding='utf8') # json 파일 열기
         movie_detail_list = json.load(movie_detail)  # json to dictionary    

        # '-'을 이용한 slicing을 통해 [1]번째 인덱스가 12인 영화의 제목 list에 담기
         release_date = movie_detail_list['release_date']
         if release_date.split('-')[1] == '12':
             released_dec_movies_list.append(movie_detail_list['title'])

    #  12월 개봉작 반환
    return released_dec_movies_list
  

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='utf-8')
    movies_list = json.load(movies_json)
    
    print(dec_movies(movies_list))