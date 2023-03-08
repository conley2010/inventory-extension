controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (!(toolbar_selected)) {
            inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.max(inventory.get_number(InventoryNumberAttribute.SelectedIndex) - 8, 0))
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        switch_between_toolbar_and_inventory()
    } else {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1)
        if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1 > toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (toolbar_selected) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] && inventory.get_items().length < inventory.get_number(InventoryNumberAttribute.MaxItems)) {
                inventory.get_items().push(toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)))
            }
        } else {
            if (inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)] && toolbar.get_items().length < toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
                toolbar.get_items().push(inventory.get_items().removeAt(inventory.get_number(InventoryNumberAttribute.SelectedIndex)))
            }
        }
        switch_between_toolbar_and_inventory()
    } else {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
            mySprite.say("That " + toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) + " was delicious!", 2000)
            toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
        }
    }
    toolbar.update()
    inventory.update()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (toolbar_selected) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, Math.max(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) - 1, 0))
        } else {
            inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.max(inventory.get_number(InventoryNumberAttribute.SelectedIndex) - 1, 0))
        }
    }
})
function switch_between_toolbar_and_inventory () {
    toolbar_selected = !(toolbar_selected)
    if (toolbar_selected) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, -1)
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
    } else {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, 0)
    }
}
function fill_inventory_with_food () {
    all_foods = [
    Inventory.create_item("Burger", img`
        . . . . c c c b b b b b . . . . 
        . . c c b 4 4 4 4 4 4 b b b . . 
        . c c 4 4 4 4 4 5 4 4 4 4 b c . 
        . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
        e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
        e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
        e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
        . e b 4 4 4 4 4 5 4 4 4 4 b e . 
        8 7 e e b 4 4 4 4 4 4 b e e 6 8 
        8 7 2 e e e e e e e e e e 2 7 8 
        e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
        e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
        e b e 8 8 c c 8 8 c c c 8 e b e 
        e e b e c c e e e e e c e b e e 
        . e e b b 4 4 4 4 4 4 4 4 e e . 
        . . . c c c c c e e e e e . . . 
        `),
    Inventory.create_item("Apple", img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 2 2 e e . . 
        . c e e e e e c 6 e e 2 2 2 e . 
        . c e e e 2 e c c 2 4 5 4 2 e . 
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
        . e e e 2 2 2 2 2 2 2 2 2 4 e . 
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
        . . 2 e e 2 2 2 2 2 4 4 2 e . . 
        . . . 2 2 e e 4 4 4 2 e e . . . 
        . . . . . 2 2 e e e e . . . . . 
        `),
    Inventory.create_item("Drumstick", img`
        . . 2 2 b b b b b . . . . . . . 
        . 2 b 4 4 4 4 4 4 b . . . . . . 
        2 2 4 4 4 4 d d 4 4 b . . . . . 
        2 b 4 4 4 4 4 4 d 4 b . . . . . 
        2 b 4 4 4 4 4 4 4 d 4 b . . . . 
        2 b 4 4 4 4 4 4 4 4 4 b . . . . 
        2 b 4 4 4 4 4 4 4 4 4 e . . . . 
        2 2 b 4 4 4 4 4 4 4 b e . . . . 
        . 2 b b b 4 4 4 b b b e . . . . 
        . . e b b b b b b b e e . . . . 
        . . . e e b 4 4 b e e e b . . . 
        . . . . . e e e e e e b d b b . 
        . . . . . . . . . . . b 1 1 1 b 
        . . . . . . . . . . . c 1 d d b 
        . . . . . . . . . . . c 1 b c . 
        . . . . . . . . . . . . c c . . 
        `),
    Inventory.create_item("Ham", img`
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 3 3 2 e . . . . 
        . . . 2 3 d 1 1 d d 3 2 e . . . 
        . . 2 3 1 d 3 3 3 d d 3 e . . . 
        . 2 3 1 3 3 3 3 3 d 1 3 b e . . 
        . 2 1 d 3 3 3 3 d 3 3 1 3 b b . 
        2 3 1 d 3 3 1 1 3 3 3 1 3 4 b b 
        2 d 3 3 d 1 3 1 3 3 3 1 3 4 4 b 
        2 d 3 3 3 1 3 1 3 3 3 1 b 4 4 e 
        2 d 3 3 3 1 1 3 3 3 3 1 b 4 4 e 
        e d 3 3 3 3 d 3 3 3 d d b 4 4 e 
        e d d 3 3 3 d 3 3 3 1 3 b 4 b e 
        e 3 d 3 3 1 d d 3 d 1 b b e e . 
        . e 3 1 1 d d 1 1 1 b b e e e . 
        . . e 3 3 3 3 3 3 b e e e e . . 
        . . . e e e e e e e e e e . . . 
        `),
    Inventory.create_item("Pizza", img`
        . . . . . . b b b b . . . . . . 
        . . . . . . b 4 4 4 b . . . . . 
        . . . . . . b b 4 4 4 b . . . . 
        . . . . . b 4 b b b 4 4 b . . . 
        . . . . b d 5 5 5 4 b 4 4 b . . 
        . . . . b 3 2 3 5 5 4 e 4 4 b . 
        . . . b d 2 2 2 5 7 5 4 e 4 4 e 
        . . . b 5 3 2 3 5 5 5 5 e e e e 
        . . b d 7 5 5 5 3 2 3 5 5 e e e 
        . . b 5 5 5 5 5 2 2 2 5 5 d e e 
        . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
        . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
        b d 3 2 d 5 5 5 d d d 4 4 . . . 
        b 5 5 5 5 d d 4 4 4 4 . . . . . 
        4 d d d 4 4 4 . . . . . . . . . 
        4 4 4 4 . . . . . . . . . . . . 
        `),
    Inventory.create_item("Donut", img`
        . . . . . . b b b b a a . . . . 
        . . . . b b d d d 3 3 3 a a . . 
        . . . b d d d 3 3 3 3 3 3 a a . 
        . . b d d 3 3 3 3 3 3 3 3 3 a . 
        . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
        . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
        b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
        b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
        b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
        a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
        a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
        a a 3 3 3 d d d a a 4 4 4 e e . 
        . e a a a a a a 4 4 4 4 e e . . 
        . . e e b b 4 4 4 4 b e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    ]
    for (let index = 0; index < randint(16, 32); index++) {
        inventory.get_items().push(all_foods._pickRandom())
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (toolbar_selected) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, Math.min(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1, toolbar.get_number(ToolbarNumberAttribute.MaxItems) - 1))
        } else {
            inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.min(inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 1, inventory.get_items().length - 1))
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventory_open) {
        if (!(toolbar_selected)) {
            inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.min(inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 8, inventory.get_items().length - 1))
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    inventory_open = !(inventory_open)
    // So Arcade doesn't think it's a regular sprite.
    inventory.set_number(InventoryNumberAttribute.SelectedIndex, inventory.get_number(InventoryNumberAttribute.SelectedIndex))
    inventory.setFlag(SpriteFlag.Invisible, !(inventory_open))
    if (!(inventory_open)) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, -1)
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        toolbar_selected = true
    }
})
function create_toolbar_and_inventory () {
    toolbar = Inventory.create_toolbar([], 3)
    toolbar.left = 4
    toolbar.bottom = scene.screenHeight() - 4
    toolbar.z = 100
    toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
    inventory = Inventory.create_inventory([], 32)
    inventory.set_number(InventoryNumberAttribute.SelectedIndex, -1)
    inventory.left = 4
    inventory.top = 4
    inventory.z = 100
    inventory.setFlag(SpriteFlag.RelativeToCamera, true)
    inventory_open = false
    inventory.setFlag(SpriteFlag.Invisible, !(inventory_open))
    toolbar_selected = true
}
let all_foods: Inventory.Item[] = []
let toolbar: Inventory.Toolbar = null
let inventory: Inventory.Inventory = null
let toolbar_selected = false
let inventory_open = false
let mySprite: Sprite = null
scene.setBackgroundColor(7)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
create_toolbar_and_inventory()
fill_inventory_with_food()
