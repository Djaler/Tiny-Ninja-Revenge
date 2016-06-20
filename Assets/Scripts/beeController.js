/**
* Пчела
*
* Класс описывает поведение противника-пчелы.
*
* @author	   Kirill Romanov
* @version	  1.0
* @copyright	GNU Public License
* @todo		 Реализовать не только горизонтальное движение
*/

#pragma strict

/**
* Левая граница движения
*
* Пчела двигается до этой точки влево, после разворачивается вправо
*
* @var Transform left
*/
public var left : Transform;
/**
* Правая граница движения
*
* Пчела двигается до этой точки вправо, после разворачивается влево
*
* @var Transform right
*/
public var right : Transform;
/**
* Скорость
*
* Скорость передвижения пчелы
*
* @var float speed
*/
public var speed : float = 0.2;

/**
* Направлена вправо
*
* Определяет, в какую сторону сейчас движется пчела
*
* @var boolean facingRight
*/
private var facingRight : boolean = false;
/**
* Аниматор
*
* Ссылка на аниматор объекта
*
* @var Animator animator
*/
private var animator : Animator;


/**
* Инициализация объекта
*
* Устанавливает значение свойству {@link animator}.
*
* @return	void
*/
function Start()
{
	animator = GetComponent(Animator);
}


/**
* Обновление объекта
*
* Перемещает объект в сторону, определяемую свойством {@link facingRight}.
* Если граница достигнута, вызывается метод {@link Flip} для разворота.
*
* @return	void
*/
function Update ()
{
	if (facingRight)
	{
		if (transform.position.x < right.position.x)
		{
			transform.position.x += speed * Time.deltaTime;
		}
		else
		{
			Flip();
		}
	}
	else
	{
		if (transform.position.x > left.position.x)
		{
			transform.position.x -= speed * Time.deltaTime;
		}
		else
		{
			Flip();
		}
	}
}


/**
* Поворот объекта
*
* Инвертирует значение свойства {@link facingRight}.
* Выполняет поворот у объекта {@link animator}.
*
* @return	void
*/
function Flip()
{
	facingRight = !facingRight;
	animator.transform.Rotate(0, 180, 0);
}
