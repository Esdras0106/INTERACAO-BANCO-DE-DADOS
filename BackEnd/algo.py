import time
import os
os.system('cls||clear')


lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
impares = []

def busca_impar(lista):
    for i in lista:
        if i % 2 != 0:
            return i
        impares.append(i)
    return 

for impar in impares:
    time.sleep(3)

impar= busca_impar(lista)
print(impar)