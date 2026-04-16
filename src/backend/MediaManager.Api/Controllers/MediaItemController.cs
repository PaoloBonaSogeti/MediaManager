using MediaManager.Api.Data;
using MediaManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediaManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaItemController(AppDbContext db) : ControllerBase
{
    // GET api/mediaitem
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MediaItem>>> GetAll()
    {
        return await db.MediaItems
            .Include(i => i.MediaType)
            .ToListAsync();
    }

    // GET api/mediaitem/3fa85f64-5717-4562-b3fc-2c963f66afa6
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MediaItem>> GetById(Guid id)
    {
        var item = await db.MediaItems
            .Include(i => i.MediaType)
            .FirstOrDefaultAsync(i => i.Id == id);

        return item is null ? NotFound() : Ok(item);
    }

    // POST api/mediaitem
    [HttpPost]
    public async Task<ActionResult<MediaItem>> Create(MediaItem item)
    {
        if (!await db.MediaTypes.AnyAsync(t => t.Id == item.MediaTypeId))
            return BadRequest($"MediaTypeId '{item.MediaTypeId}' does not exist.");

        item.Id = Guid.NewGuid();
        db.MediaItems.Add(item);
        await db.SaveChangesAsync();

        await db.Entry(item).Reference(i => i.MediaType).LoadAsync();

        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    // PUT api/mediaitem/3fa85f64-5717-4562-b3fc-2c963f66afa6
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, MediaItem item)
    {
        if (id != item.Id)
            return BadRequest();

        if (!await db.MediaTypes.AnyAsync(t => t.Id == item.MediaTypeId))
            return BadRequest($"MediaTypeId '{item.MediaTypeId}' does not exist.");

        db.Entry(item).State = EntityState.Modified;

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await db.MediaItems.AnyAsync(i => i.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE api/mediaitem/3fa85f64-5717-4562-b3fc-2c963f66afa6
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var item = await db.MediaItems.FindAsync(id);
        if (item is null)
            return NotFound();

        db.MediaItems.Remove(item);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
